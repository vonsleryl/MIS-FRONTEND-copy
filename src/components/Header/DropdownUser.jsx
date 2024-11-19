import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";

import ProfileUser from "../../assets/images/profile-user.jpg";
import ProfileVons from "../../assets/images/profile-vons.jpg";
import ProfileMaizo from "../../assets/images/profile-maizo.jpg";
import ProfileThomas from "../../assets/images/thomas.jfif";

import { AuthContext } from "../context/AuthContext";
import { HasRole } from "../reuseable/HasRole";
import { Badge } from "../ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";

const DropdownUser = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const trigger = useRef(null);
  const dropdown = useRef(null);

  const { user, setIsLoggingOut } = useContext(AuthContext);

  const profileImage = useMemo(() => {
    return HasRole(user.role, "SuperAdmin")
      ? ProfileThomas
      : user.firstName === "Vonsleryl"
        ? ProfileVons
        : user.firstName === "John Robert"
          ? ProfileMaizo
          : ProfileUser;
  }, [user.role, user.firstName]); // This will recalculate only when user.role or user.firstName changes

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!dropdown.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  return (
    <>
      <div className="relative">
        <Link
          ref={trigger}
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center gap-4"
          to="#"
        >
          <span className="hidden text-right lg:block">
            <span className="block text-sm font-medium text-black dark:text-white">
              {user.fullName}
            </span>
            <div className="block text-xs">
              Role:{" "}
              {HasRole(user.role, "SuperAdmin") ? (
                <Badge className="!bg-red-600 !text-white hover:!bg-red-700">
                  Super Admin
                </Badge>
              ) : HasRole(user.role, "Admin") ? (
                <Badge className="!bg-blue-500 !text-white hover:!bg-blue-600">
                  Admin {user.campusName && `(${user.campusName})`}
                </Badge>
              ) : HasRole(user.role, "MIS") ? (
                <Badge className="!bg-emerald-700 !text-white hover:!bg-emerald-800">
                  MIS {user.campusName && `(${user.campusName})`}
                </Badge>
              ) : HasRole(user.role, "Registrar") ? (
                <Badge className="!bg-violet-800 !text-white hover:!bg-violet-900">
                  Registrar {user.campusName && `(${user.campusName})`}
                </Badge>
              ) : HasRole(user.role, "DataCenter") ? (
                <Badge className="!bg-orange-500 !text-white hover:!bg-orange-600">
                  Data Center {user.campusName && `(${user.campusName})`}
                </Badge>
              ) : HasRole(user.role, "Dean") ? (
                <Badge className="!bg-cyan-700 !text-white hover:!bg-cyan-800">
                  Dean {user.campusName && `(${user.campusName})`}
                </Badge>
              ) : HasRole(user.role, "Accounting") ? (
                <Badge className="!bg-green-500 !text-white hover:!bg-green-600">
                  Accounting {user.campusName && `(${user.campusName})`}
                </Badge>
              ) : (
                <span className="ml-1 font-semibold">
                  {HasRole(user.role, "SuperAdmin") ||
                  HasRole(user.role, "Admin")
                    ? ""
                    : user.role}
                  {user.campusName && `(${user.campusName})`}
                </span>
              )}
            </div>
          </span>

          <Avatar className="!aspect-square !h-[3em] !w-[3em]">
            <AvatarImage
              draggable={false}
              src={profileImage}
              alt="User"
              className=""
            />
            <AvatarFallback>
              {user.firstName[0]}
              {user.firstName.split(" ")[1]
                ? user.firstName.split(" ")[1][0]
                : user.middleName && user.middleName[0]}
              {user.lastName[0]}
            </AvatarFallback>
          </Avatar>

          <svg
            className="hidden fill-current sm:block"
            width="12"
            height="8"
            viewBox="0 0 12 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0.410765 0.910734C0.736202 0.585297 1.26384 0.585297 1.58928 0.910734L6.00002 5.32148L10.4108 0.910734C10.7362 0.585297 11.2638 0.585297 11.5893 0.910734C11.9147 1.23617 11.9147 1.76381 11.5893 2.08924L6.58928 7.08924C6.26384 7.41468 5.7362 7.41468 5.41077 7.08924L0.410765 2.08924C0.0853277 1.76381 0.0853277 1.23617 0.410765 0.910734Z"
              fill=""
            />
          </svg>
        </Link>

        {/* <!-- Dropdown Start --> */}
        <div
          ref={dropdown}
          onFocus={() => setDropdownOpen(true)}
          onBlur={() => setDropdownOpen(false)}
          className={`absolute right-0 mt-4 flex w-62.5 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark ${
            dropdownOpen === true ? "block" : "hidden"
          }`}
        >
          <ul className="flex flex-col gap-5 border-b border-stroke px-7 py-4 dark:border-strokedark">
            <span className="block text-center text-sm font-medium text-black dark:text-white lg:hidden">
              {user.fullName}
              <div className="block text-xs">
                <span className="hidden md:mt-1 md:block">Role: </span>
                <div className="mt-3 md:mt-0">
                  {HasRole(user.role, "SuperAdmin") ? (
                    <Badge className="!bg-red-600 !text-white hover:!bg-red-700">
                      Super Admin
                    </Badge>
                  ) : HasRole(user.role, "Admin") ? (
                    <Badge className="!bg-blue-500 !text-white hover:!bg-blue-600">
                      Admin {user.campusName && `(${user.campusName})`}
                    </Badge>
                  ) : HasRole(user.role, "MIS") ? (
                    <Badge className="!bg-emerald-700 !text-white hover:!bg-emerald-800">
                      MIS {user.campusName && `(${user.campusName})`}
                    </Badge>
                  ) : HasRole(user.role, "Registrar") ? (
                    <Badge className="!bg-violet-800 !text-white hover:!bg-violet-900">
                      Registrar {user.campusName && `(${user.campusName})`}
                    </Badge>
                  ) : HasRole(user.role, "DataCenter") ? (
                    <Badge className="!bg-orange-500 !text-white hover:!bg-orange-600">
                      Data Center {user.campusName && `(${user.campusName})`}
                    </Badge>
                  ) : HasRole(user.role, "Dean") ? (
                    <Badge className="!bg-cyan-700 !text-white hover:!bg-cyan-800">
                      Dean {user.campusName && `(${user.campusName})`}
                    </Badge>
                  ) : HasRole(user.role, "Accounting") ? (
                    <Badge className="!bg-green-500 !text-white hover:!bg-green-600">
                      Accounting {user.campusName && `(${user.campusName})`}
                    </Badge>
                  ) : (
                    <span className="ml-1 font-semibold">
                      {HasRole(user.role, "SuperAdmin") ||
                      HasRole(user.role, "Admin")
                        ? ""
                        : user.role}
                      {user.campusName && `(${user.campusName})`}
                    </span>
                  )}
                </div>
              </div>
            </span>

            {/* vv Settings vv */}
            {/* 
            
            <li>
              <Link
                to="/pages/settings"
                className="pointer-events-none flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
              >
                <svg
                  className="fill-current"
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20.8656 8.86874C20.5219 8.49062 20.0406 8.28437 19.525 8.28437H19.4219C19.25 8.28437 19.1125 8.18124 19.0781 8.04374C19.0437 7.90624 18.975 7.80312 18.9406 7.66562C18.8719 7.52812 18.9406 7.39062 19.0437 7.28749L19.1125 7.21874C19.4906 6.87499 19.6969 6.39374 19.6969 5.87812C19.6969 5.36249 19.525 4.88124 19.1469 4.50312L17.8062 3.12812C17.0844 2.37187 15.8469 2.33749 15.0906 3.09374L14.9875 3.16249C14.8844 3.26562 14.7125 3.29999 14.5406 3.23124C14.4031 3.16249 14.2656 3.09374 14.0937 3.05937C13.9219 2.99062 13.8187 2.85312 13.8187 2.71562V2.54374C13.8187 1.47812 12.9594 0.618744 11.8937 0.618744H9.96875C9.45312 0.618744 8.97187 0.824994 8.62812 1.16874C8.25 1.54687 8.07812 2.02812 8.07812 2.50937V2.64687C8.07812 2.78437 7.975 2.92187 7.8375 2.99062C7.76875 3.02499 7.73437 3.02499 7.66562 3.05937C7.52812 3.12812 7.35625 3.09374 7.25312 2.99062L7.18437 2.88749C6.84062 2.50937 6.35937 2.30312 5.84375 2.30312C5.32812 2.30312 4.84687 2.47499 4.46875 2.85312L3.09375 4.19374C2.3375 4.91562 2.30312 6.15312 3.05937 6.90937L3.12812 7.01249C3.23125 7.11562 3.26562 7.28749 3.19687 7.39062C3.12812 7.52812 3.09375 7.63124 3.025 7.76874C2.95625 7.90624 2.85312 7.97499 2.68125 7.97499H2.57812C2.0625 7.97499 1.58125 8.14687 1.20312 8.52499C0.824996 8.86874 0.618746 9.34999 0.618746 9.86562L0.584371 11.7906C0.549996 12.8562 1.40937 13.7156 2.475 13.75H2.57812C2.75 13.75 2.8875 13.8531 2.92187 13.9906C2.99062 14.0937 3.05937 14.1969 3.09375 14.3344C3.12812 14.4719 3.09375 14.6094 2.99062 14.7125L2.92187 14.7812C2.54375 15.125 2.3375 15.6062 2.3375 16.1219C2.3375 16.6375 2.50937 17.1187 2.8875 17.4969L4.22812 18.8719C4.95 19.6281 6.1875 19.6625 6.94375 18.9062L7.04687 18.8375C7.15 18.7344 7.32187 18.7 7.49375 18.7687C7.63125 18.8375 7.76875 18.9062 7.94062 18.9406C8.1125 19.0094 8.21562 19.1469 8.21562 19.2844V19.4219C8.21562 20.4875 9.075 21.3469 10.1406 21.3469H12.0656C13.1312 21.3469 13.9906 20.4875 13.9906 19.4219V19.2844C13.9906 19.1469 14.0937 19.0094 14.2312 18.9406C14.3 18.9062 14.3344 18.9062 14.4031 18.8719C14.575 18.8031 14.7125 18.8375 14.8156 18.9406L14.8844 19.0437C15.2281 19.4219 15.7094 19.6281 16.225 19.6281C16.7406 19.6281 17.2219 19.4562 17.6 19.0781L18.975 17.7375C19.7312 17.0156 19.7656 15.7781 19.0094 15.0219L18.9406 14.9187C18.8375 14.8156 18.8031 14.6437 18.8719 14.5406C18.9406 14.4031 18.975 14.3 19.0437 14.1625C19.1125 14.025 19.25 13.9562 19.3875 13.9562H19.4906H19.525C20.5562 13.9562 21.4156 13.1312 21.45 12.0656L21.4844 10.1406C21.4156 9.72812 21.2094 9.21249 20.8656 8.86874ZM19.8344 12.1C19.8344 12.3062 19.6625 12.4781 19.4562 12.4781H19.3531H19.3187C18.5281 12.4781 17.8062 12.9594 17.5312 13.6469C17.4969 13.75 17.4281 13.8531 17.3937 13.9562C17.0844 14.6437 17.2219 15.5031 17.7719 16.0531L17.8406 16.1562C17.9781 16.2937 17.9781 16.5344 17.8406 16.6719L16.4656 18.0125C16.3625 18.1156 16.2594 18.1156 16.1906 18.1156C16.1219 18.1156 16.0187 18.1156 15.9156 18.0125L15.8469 17.9094C15.2969 17.325 14.4719 17.1531 13.7156 17.4969L13.5781 17.5656C12.8219 17.875 12.3406 18.5625 12.3406 19.3531V19.4906C12.3406 19.6969 12.1687 19.8687 11.9625 19.8687H10.0375C9.83125 19.8687 9.65937 19.6969 9.65937 19.4906V19.3531C9.65937 18.5625 9.17812 17.8406 8.42187 17.5656C8.31875 17.5312 8.18125 17.4625 8.07812 17.4281C7.80312 17.2906 7.52812 17.2562 7.25312 17.2562C6.77187 17.2562 6.29062 17.4281 5.9125 17.8062L5.84375 17.8406C5.70625 17.9781 5.46562 17.9781 5.32812 17.8406L3.9875 16.4656C3.88437 16.3625 3.88437 16.2594 3.88437 16.1906C3.88437 16.1219 3.88437 16.0187 3.9875 15.9156L4.05625 15.8469C4.64062 15.2969 4.8125 14.4375 4.50312 13.75C4.46875 13.6469 4.43437 13.5437 4.36562 13.4406C4.09062 12.7187 3.40312 12.2031 2.6125 12.2031H2.50937C2.30312 12.2031 2.13125 12.0312 2.13125 11.825L2.16562 9.89999C2.16562 9.76249 2.23437 9.69374 2.26875 9.62499C2.30312 9.59062 2.40625 9.52187 2.54375 9.52187H2.64687C3.4375 9.55624 4.15937 9.07499 4.46875 8.35312C4.50312 8.24999 4.57187 8.14687 4.60625 8.04374C4.91562 7.35624 4.77812 6.49687 4.22812 5.94687L4.15937 5.84374C4.02187 5.70624 4.02187 5.46562 4.15937 5.32812L5.53437 3.98749C5.6375 3.88437 5.74062 3.88437 5.80937 3.88437C5.87812 3.88437 5.98125 3.88437 6.08437 3.98749L6.15312 4.09062C6.70312 4.67499 7.52812 4.84687 8.28437 4.53749L8.42187 4.46874C9.17812 4.15937 9.65937 3.47187 9.65937 2.68124V2.54374C9.65937 2.40624 9.72812 2.33749 9.7625 2.26874C9.79687 2.19999 9.9 2.16562 10.0375 2.16562H11.9625C12.1687 2.16562 12.3406 2.33749 12.3406 2.54374V2.68124C12.3406 3.47187 12.8219 4.19374 13.5781 4.46874C13.6812 4.50312 13.8187 4.57187 13.9219 4.60624C14.6437 4.94999 15.5031 4.81249 16.0875 4.26249L16.1906 4.19374C16.3281 4.05624 16.5687 4.05624 16.7062 4.19374L18.0469 5.56874C18.15 5.67187 18.15 5.77499 18.15 5.84374C18.15 5.91249 18.1156 6.01562 18.0469 6.11874L17.9781 6.18749C17.3594 6.70312 17.1875 7.56249 17.4625 8.24999C17.4969 8.35312 17.5312 8.45624 17.6 8.55937C17.875 9.28124 18.5625 9.79687 19.3531 9.79687H19.4562C19.5937 9.79687 19.6625 9.86562 19.7312 9.89999C19.8 9.93437 19.8344 10.0375 19.8344 10.175V12.1Z"
                    fill=""
                  />
                  <path
                    d="M11 6.32498C8.42189 6.32498 6.32501 8.42186 6.32501 11C6.32501 13.5781 8.42189 15.675 11 15.675C13.5781 15.675 15.675 13.5781 15.675 11C15.675 8.42186 13.5781 6.32498 11 6.32498ZM11 14.1281C9.28126 14.1281 7.87189 12.7187 7.87189 11C7.87189 9.28123 9.28126 7.87186 11 7.87186C12.7188 7.87186 14.1281 9.28123 14.1281 11C14.1281 12.7187 12.7188 14.1281 11 14.1281Z"
                    fill=""
                  />
                </svg>
                Account Settings
              </Link>
            </li>
          
           */}
          </ul>
          <button
            className="flex items-center gap-3.5 px-6 py-4 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
            onClick={() => setIsLoggingOut(true)}
          >
            <svg
              className="fill-current"
              width="22"
              height="22"
              viewBox="0 0 18 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_130_9814)">
                <path
                  d="M12.7127 0.55835H9.53457C8.80332 0.55835 8.18457 1.1771 8.18457 1.90835V3.84897C8.18457 4.18647 8.46582 4.46772 8.80332 4.46772C9.14082 4.46772 9.45019 4.18647 9.45019 3.84897V1.88022C9.45019 1.82397 9.47832 1.79585 9.53457 1.79585H12.7127C13.3877 1.79585 13.9221 2.33022 13.9221 3.00522V15.0709C13.9221 15.7459 13.3877 16.2802 12.7127 16.2802H9.53457C9.47832 16.2802 9.45019 16.2521 9.45019 16.1959V14.2552C9.45019 13.9177 9.16894 13.6365 8.80332 13.6365C8.43769 13.6365 8.18457 13.9177 8.18457 14.2552V16.1959C8.18457 16.9271 8.80332 17.5459 9.53457 17.5459H12.7127C14.0908 17.5459 15.1877 16.4209 15.1877 15.0709V3.03335C15.1877 1.65522 14.0627 0.55835 12.7127 0.55835Z"
                  fill=""
                />
                <path
                  d="M10.4346 8.60205L7.62207 5.7333C7.36895 5.48018 6.97519 5.48018 6.72207 5.7333C6.46895 5.98643 6.46895 6.38018 6.72207 6.6333L8.46582 8.40518H3.45957C3.12207 8.40518 2.84082 8.68643 2.84082 9.02393C2.84082 9.36143 3.12207 9.64268 3.45957 9.64268H8.49395L6.72207 11.4427C6.46895 11.6958 6.46895 12.0896 6.72207 12.3427C6.83457 12.4552 7.00332 12.5114 7.17207 12.5114C7.34082 12.5114 7.50957 12.4552 7.62207 12.3145L10.4346 9.4458C10.6877 9.24893 10.6877 8.85518 10.4346 8.60205Z"
                  fill=""
                />
              </g>
              <defs>
                <clipPath id="clip0_130_9814">
                  <rect
                    width="18"
                    height="18"
                    fill="white"
                    transform="translate(0 0.052124)"
                  />
                </clipPath>
              </defs>
            </svg>
            Log Out
          </button>
        </div>
        {/* <!-- Dropdown End --> */}
      </div>
    </>
  );
};

export default DropdownUser;
