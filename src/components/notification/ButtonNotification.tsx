import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-regular-svg-icons";
import Button from '../button/Button'

export default function ButtonNotification({ countNofications }: any) {
    return (
        <Button className="p-2 border-2 rounded-full border-transparent  hover:border-blue-600">
            <div className="relative items-center">
                <FontAwesomeIcon icon={faBell} size="xl" />
                <span className="absolute bottom-3 left-4 mt-0 text-red-500">
                    {countNofications}
                </span>
            </div>
        </Button>
    )
}
