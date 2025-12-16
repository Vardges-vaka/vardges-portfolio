export const NEW_PROJECT = {
  title: {
    en: {
      value: "",
      errorMessage: "Add the Title",
      isTouched: false,
      isError: true,
    },
    ru: {
      value: "",
      errorMessage: "Add the Title",
      isTouched: false,
      isError: true,
    },
    hy: {
      value: "",
      errorMessage: "Add the Title",
      isTouched: false,
      isError: true,
    },
    ar: {
      value: "",
      errorMessage: "Add the Title",
      isTouched: false,
      isError: true,
    },
  },
  description: {
    brief: {
      en: {
        value: "",
        errorMessage: "Add the Brief Description",
        isTouched: false,
        isError: true,
      },
      ru: {
        value: "",
        errorMessage: "Add the Brief Description",
        isTouched: false,
        isError: true,
      },
      hy: {
        value: "",
        errorMessage: "Add the Brief Description",
        isTouched: false,
        isError: true,
      },
      ar: {
        value: "",
        errorMessage: "Add the Brief Description",
        isTouched: false,
        isError: true,
      },
    },
    detailed: {
      en: {
        value: "",
        errorMessage: "Add the detailed Description",
        isTouched: false,
        isError: true,
      },
      ru: {
        value: "",
        errorMessage: "Add the detailed Description",
        isTouched: false,
        isError: true,
      },
      hy: {
        value: "",
        errorMessage: "Add the detailed Description",
        isTouched: false,
        isError: true,
      },
      ar: {
        value: "",
        errorMessage: "Add the detailed Description",
        isTouched: false,
        isError: true,
      },
    },
  },
  type: "",
  config: {
    isPublic: false,
    priority: "",
    timing: {
      startDate: "",
      endDate: "",
      deadline: "",
      isOngoing: false,
      isDeadline: false,
    },
  },
};

export const NEW_PROJECT_GENERAL_INFO = {
  title: {
    en: {
      value: "",
      errorMessage: "Add the Title",
      isTouched: false,
      isError: true,
    },
    ru: {
      value: "",
      errorMessage: "Add the Title",
      isTouched: false,
      isError: true,
    },
    hy: {
      value: "",
      errorMessage: "Add the Title",
      isTouched: false,
      isError: true,
    },
    ar: {
      value: "",
      errorMessage: "Add the Title",
      isTouched: false,
      isError: true,
    },
  },
  description: {
    brief: {
      en: {
        value: "",
        errorMessage: "Add the Brief Description",
        isTouched: false,
        isError: true,
      },
      ru: {
        value: "",
        errorMessage: "Add the Brief Description",
        isTouched: false,
        isError: true,
      },
      hy: {
        value: "",
        errorMessage: "Add the Brief Description",
        isTouched: false,
        isError: true,
      },
      ar: {
        value: "",
        errorMessage: "Add the Brief Description",
        isTouched: false,
        isError: true,
      },
    },
    detailed: {
      en: {
        value: "",
        errorMessage: "Add the detailed Description",
        isTouched: false,
        isError: true,
      },
      ru: {
        value: "",
        errorMessage: "Add the detailed Description",
        isTouched: false,
        isError: true,
      },
      hy: {
        value: "",
        errorMessage: "Add the detailed Description",
        isTouched: false,
        isError: true,
      },
      ar: {
        value: "",
        errorMessage: "Add the detailed Description",
        isTouched: false,
        isError: true,
      },
    },
  },
};
export const NEW_PROJECT_CONFIG = {
  isPublic: false,
  priority: "",
  timing: {
    startDate: "",
    endDate: "",
    deadline: "",
    isOngoing: false,
    isDeadline: false,
  },
};

export const NEW_PROJECT_INFO = {
  techStack: [""],
  hasBackEnd: false,
  db: {
    value: "",
    errorMessage: "Select the Database",
    isTouched: false,
    isError: true,
  },

  links: {
    gitHub: {
      value: "",
      errorMessage: "Add the GitHub Link",
      isTouched: false,
      isError: true,
    },
    url: {
      value: "",
      errorMessage: "Add the URL",
      isTouched: false,
      isError: true,
    },
  },
  cloudStorage: {
    value: "",
    errorMessage: "Select the Cloud Storage",
    isTouched: false,
    isError: true,
  },
  shouldShowPackages: false,
  packages: [
    {
      ref: "frontEnd",
      name: "",
    },
  ],
};

export const GENERAL_INFO_FIELDS = [
  {
    label: "English",
    field: "title",
    lng: "en",
    subField: "",
  },
  {
    label: "Russian",
    field: "title",
    lng: "ru",
    subField: "",
  },
  {
    label: "Arabic",
    field: "title",
    lng: "ar",
    subField: "",
  },
  {
    label: "Armenian",
    field: "title",
    lng: "hy",
    subField: "",
  },

  {
    label: "English",
    field: "description",
    lng: "en",
    subField: "brief",
  },
  {
    label: "Russian",
    field: "description",
    lng: "ru",
    subField: "brief",
  },
  {
    label: "Arabic",
    field: "description",
    lng: "ar",
    subField: "brief",
  },
  {
    label: "Armenian",
    field: "description",
    lng: "hy",
    subField: "brief",
  },

  {
    label: "English",
    field: "description",
    lng: "en",
    subField: "detailed",
  },
  {
    label: "Russian",
    field: "description",
    lng: "ru",
    subField: "detailed",
  },
  {
    label: "Arabic",
    field: "description",
    lng: "ar",
    subField: "detailed",
  },
  {
    label: "Armenian",
    field: "description",
    lng: "hy",
    subField: "detailed",
  },
];

export const NEW_PROJECT_VALIDATIONS = {
  generalInfo: {
    isValid: false,
    errorMessage: "",
  },
  specificInfo: {
    isValid: false,
    errorMessage: "",
  },
  config: {
    isValid: false,
    errorMessage: "",
  },
};
