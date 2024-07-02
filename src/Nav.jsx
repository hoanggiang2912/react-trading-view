import { NavLink } from "react-router-dom";

function Nav() {
  return (
    <div className="flex p-2">
      <form action="#" className="flex items-center gap-2 mr-4">
        <input
          type="text"
          placeholder="Nhập mã CK..."
          className="w-[180px] h-full border border-slate-200 rounded-lg py-2 px-3 outline-none  bg-transparent"
        />
        <button className="inline-flex items-center gap-2 justify-center p-2 font-sans font-semibold h-full tracking-wide text-white bg-blue-500 rounded-lg">
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </span>
        </button>
      </form>

      <nav className="">
        <ul className="flex flex-col font-medium h-full items-center justify-center mt-4 rounded-lg md:flex-row md:mt-0 md:text-sm  md:space-x-8 md:rtl:space-x-reverse">
          <li>
            <NavLink
              to="/"
              className="block py-2 px-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              aria-current="page"
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/chart"}
              className="block py-2 px-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
            >
              Chart
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/trending-ticker"}
              className="block py-2 px-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
            >
              Trending Ticker
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Nav;
