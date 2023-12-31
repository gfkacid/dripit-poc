const theme = {
  root: {
    base: "bg-white px-2 py-2.5 dark:border-gray-700 dark:bg-gray-800 sm:px-4 fixed w-full top-0 left-0 z-50",
    rounded: {
      on: "",
      off: "",
    },
    bordered: {
      on: "border",
      off: "",
    },
    inner: {
      base: "mx-auto flex flex-wrap items-center",
      fluid: {
        on: "",
        off: "container",
      },
    },
  },
  brand: {
    base: "flex items-center",
  },
  collapse: {
    base: "w-full md:block md:w-auto ml-auto",
    list: "mt-4 flex flex-col md:mt-0 md:flex-row md:space-x-8 md:text-sm md:font-medium",
    hidden: {
      on: "hidden",
      off: "",
    },
  },
  link: {
    base: "block py-2 pr-4 pl-3 md:p-0",
    active: {
      on: "bg-secondary text-white dark:text-white md:bg-transparent md:text-secondary",
      off: "dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:hover:bg-transparent md:text-black md:hover:text-secondary md:dark:hover:bg-transparent md:dark:hover:text-white",
    },
    // disabled: {
    //   on: "text-gray-400 hover:cursor-not-allowed dark:text-gray-600",
    //   off: "",
    // },
  },
  // toggle: {
  //   base: "inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden",
  //   icon: "h-6 w-6 shrink-0",
  // },
};

export default theme;
