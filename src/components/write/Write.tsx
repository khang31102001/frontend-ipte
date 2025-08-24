import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function Write({ children }: any) {
  return (
      <Link
          href={'/draft'}
          className="flex gap-1 btn bg-sky-500 py-1 px-3 rounded-2xl text-white mx-2"
      >
          <div>
              <FontAwesomeIcon icon={faPenToSquare} />
          </div>
          <div>{children}</div>
      </Link>
  )
}
