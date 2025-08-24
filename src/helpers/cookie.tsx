import Cookies from "universal-cookie";

const cookies = new Cookies();

/**
 * Sets a cookie when the name, value and path is passed in.
 *
 * @param cookieName - Name of the cookie.
 * @param cookieValue - Value of the cookie.
 * @param cookiePath - Path of the cookie. Defaults to "/".
 */
export function setCookie(
    cookieName: string,
    cookieValue: string,
    expriedAt: Date = new Date(new Date().setDate(new Date().getDate() + 1)),
    secure : boolean,
    cookiePath = "/"
) {
    cookies.set(cookieName, cookieValue, {
        path: cookiePath,
        expires: expriedAt,
        secure : true
    });
}

/**
 * Removes a cookie when the name and the path is passed in.
 *
 * @param cookieName - Name of the cookie.
 * @param cookiePath - Path of the cookie. Defaults to "/".
 */
export function removeCookie(cookieName: string, cookiePath = "/") {
    cookies.remove(cookieName, {
        path: cookiePath,
    });
}

/**
 * Retrieves a cookie.
 *
 * @param cookieName - Name of the cookie.
 * @return {any}
 */
export function getCookie(cookieName: string) {
    return cookies.get(cookieName);
}

