```
└── 📁_sample_dir_named[XXX] <!--#1  -->
    └── 📁_styles <!--#2 -->
        ├── xXX_YYY_ZZZ.css <!--#3 -->
        ├── xXX_YYY.css <!--#4 -->
        ├── xXX.css <!--#5 -->
    └── 📁01_XXX_comps <!--#6 -->
        └── 📁XXX_childComps <!--#7 -->
            ├── _XXX_childComps.index.js <!--#8 -->
            ├── XXX_YYY_ZZZ.jsx <!--#9 -->
        ├── _XXX_comps.index.js <!--#10 -->
        ├── XXX_YYY.jsx <!--#11 -->
    └── 📁02_XXX_helpers <!--#12 -->
        ├── _XXX_helpers.index.js <!--#13 -->
    └── 📁03_XXX_hooks <!--#14 -->
        ├── _XXX_hooks.index.js <!--#15 -->
        ├── useXXX_apiHelpers.js <!--#16 -->
        ├── useXXX_handlers.js <!--#16 -->
        ├── useXXX_states.js <!--#17 -->
        ├── useXXX.js <!--#18 -->
    └── 📁04_XXX_vld <!--#19 -->
        ├── _XXX_vld.index.js <!--#20 -->
    └── 📁05_XXX_cnst <!--#21 -->
        ├── _XXX_cnst.index.js <!--#22 -->
    └── 📁06_XXX_memo <!--#23 -->
        ├── _XXX_memo.index.js <!--#24 -->
    └── 📁07_XXX_test <!--#25 -->
        ├── _XXX_test.index.js <!--#26 -->
    ├── desktop.ini <!--#27 -->
    ├── README_frontEnd _dir_sample.md <!--#28 -->
    ├── XXX.config.js <!--#29 -->
    └── XXX.jsx  <!--#30 --> <!-- Main parent component — the page entry point -->
```

#1: this is the sample directory. so if for example we are working on the page that loads Admin details like the name, image, email, etc. we will create a directory named adminProfile(notice it is starts with a lowercase letter !)

#2: this is the directory that contains all the css files for the page. it is always called \_styles. All the css files in this directory live here.

#3, #4 and #5: this is the css file for the page with the file named XXX_YYY_ZZZ.jsx. all the ui components start with the capital letter, all of them have a css file imported on top of the page after rest of the imports. the css files are named exacly as the components except they start with a non capital/ small case letter. ALWAYS!!!! same thing for the xXX_YYY.css --> XXX_YYY.jsx(component) and xXX.css --> XXX.jsx(component)

#6: this is the directory that contains all the ui components for the page. it is always called 01_XXX_comps where XXX stands for the parent directory name. so in our case it would be 01_adminProfile_comps. All the ui components in this directory live here.

#7: this is the directory that contains all the child components if there are any for the page. This is optional and if there are no child components, this directory can be removed or not created at all. if it is there it is always called XXX_childComps where XXX is the parent directory name. so in our case it would be adminProfile_childComps. All the child components in this directory live here.

#8: this is the index file for the child components. it is always called \_XXX_childComps.index.js where XXX is the parent directory name. in another words every directory besides the #1: \_styles directory will have an barrel file that is named starting with one underscore followed by that directory name followed by another under score than dot than inde.js. in our case it would be \_adminProfile_childComps.index.js. All the components, hooks, functions are exported from this barrel file.

#9: this is the child component file. it is always named XXX_YYY_ZZZ.jsx where XXX_YYY is the calling component name (#30) not the directory name but the component's name who is using this comonent. than the ZZZ is it's own name. so in our case it would be for example: AdminProfile_form_fileSection.jsx. notice after underscore the naming starts with small case letter.

#10: Again the same barrel file. smae convention and logic as before with #8

#11: This is a component that belongs to the #30 main component. it is named XXX_YYY.jsx where XXX is the calling component, and at this level it should always be the directories parent component. so in our case it would be AdminProfile_form.jsx. notice after underscore the naming starts with small case letter.

#12: directory for the directory's helper functions. it is always called 02_XXX_helpers where XXX is the parent directory name. so in our case it would be 02_adminProfile_helpers. All the helper functions in this directory live here. and are exported from the #13 barrel file.

#14: This wher our hooks live. it is always called 03_XXX_hooks where XXX is the parent directory name. so in our case it would be 03_adminProfile_hooks. All the hooks in this directory live here. and are exported from the #15 barrel file.

#16 && #17 && #18 && #19: This is where we declare the states, handlers, apiHelpers, and the main hook. it is always called 03_XXX_hooks where XXX is the parent component's name. so in our case it would be the followings:

useXXX_states.js --> useAdminProfile_states.js
here where we declare all or states, reff's setters and return a states, setters objects,and refs objects if neccecary,

useXXX_apiHelpers.js --> useAdminProfile_apiHelpers.js
here we import the base api helper functions from the shared API layer: frontEnd\src\05_helpers\apiHelpers
it can take other parameters like the global loders, notification systems, etc. it created polishes the wrappers and helper functions for the api calls and builds and returns the apiHelper object that is used by the handlers and other hooks if neccecary.

useXXX_handlers.js --> useAdminProfile_handlers.js

this typically takes all the states, setters, refs(if there are), api helpers and any other parameters if neccecary and construct's handler functions, and returns the handlers object. if it becomes too large it could split based on the functionality! like for example in our case could be so many handlers so we can use like this: useAdminProfile_handlers_form.js than we pass allneccecary arguments to it from the useAdminProfile_handlers.js and extract the forHandlers object from it than in our useAdminProfile_handlers.js wehn we return the hahndlesr we could spread the formHandlers as well with the global handlers.

useXXX.js --> useAdminProfile.js

this is the main hook where it manages everything. all the useEffects live here. it usese the above hooks, to get the states, setters, handlers, apiHelpers, reffs, etc. to contract the objects for component's props. the components props names exaclt the same as the components names followed by underscore and props. in our case it might looklike this:

AdminProfile_form_file_props={
states:{...},
handlers:{...},
compProps:{...},
t,
}.
AdminProfile_form_props={
states:{...},
handlers:{...},
compProps:{AdminProfile_form_file_props},
t,
}.

AdminProfile_props={
states:{...},
handlers:{...},
compProps:{AdminProfile_form_props},

}.

etc.

#19: this is the validation and sanitization directory. it is always called 04_XXX_vld where XXX is the parent directory name. so in our case it would be 04_adminProfile_vld. All the validation and sanitization functions in this directory live here. and are exported from the #20 barrel file.

#21: this is the constants directory. it is always called 05_XXX_cnst where XXX is the parent directory name. so in our case it would be 05_adminProfile_cnst. All the constants in this directory live here. and are exported from the #22 barrel file.

#23: this is where our cutom comparison logic lives, the logic is used by react.memo to render or not to render the comonent. everything here are exported from the #24 barrel file.

#25: this is where our tests live and are exported from the #26 barrel file.

#27: igone this!

#28: Ignore this!

#29: this is the configuration file for the page. it is always called XXX.config.js where XXX is the parent directory name. so in our case it would be adminProfile.config.js. All the configuration for the page live here. things like should debug, any env related variables.

#30: Final file for the page. it is always called XXX.jsx where XXX is the parent directory name but starting with the Capital letter. so in our case it would be AdminProfile.jsx. this is the main file for the page. it is the entry point for the page. it uses everything in this directory to render a proper UI/UX for the users.
