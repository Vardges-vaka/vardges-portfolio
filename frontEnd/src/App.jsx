import { Suspense } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

// Contexts
import {
  ThemeProvider,
  LanguageProvider,
  ProfileProvider,
  NotificationProvider,
} from "./02_context/context.index";

// Layouts & Routes
import {
  AdminLayout,
  PublicLayout,
  AdminRoutes,
  PublicRoutes,
} from "./06_routes/_routes.index.js";

// ! Global Styles
import "./09_styles/globalColors.css";
import "./09_styles/globalSpacing.css";
import "./09_styles/lightTheme.css";
import "./09_styles/darkTheme.css";
import "./09_styles/App.css";
import "./09_styles/globalColorsNew.css";
/*






*/

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <ProfileProvider>
          <NotificationProvider>
            <Router>
              <Suspense fallback={<p>Loading...</p>}>
                <Routes>
                  {/* // ! Admin Routes */}
                  <Route path="admin/*" element={<AdminLayout />}>
                    <Route path="*" element={<AdminRoutes />} />
                  </Route>

                  {/* // ! Public Routes */}
                  <Route path="/*" element={<PublicLayout />}>
                    <Route path="*" element={<PublicRoutes />} />
                  </Route>
                </Routes>
              </Suspense>
            </Router>
          </NotificationProvider>
        </ProfileProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
