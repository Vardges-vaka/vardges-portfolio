import { Suspense } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
// Contexts
import {
  ThemeProvider,
  LanguageProvider,
  ProfileProvider,
  LanguageRouteWrapper,
} from "./02_context/context.index";

// Components
import {
  PublicHeader,
  PublicFooter,
} from "./10_pages/publicPageComponents/publicPageComponents.index.js";

// Pages
import {
  Home,
  Bio,
  Journey,
  Projects,
  Skills,
  Achievements,
  Education,
  Vision,
  Values,
  Contact,
} from "./10_pages/public/public.index.js";

// ! Test
import Test from "./Test";

// ! Global Styles
import "./09_styles/globalColors.css";
import "./09_styles/globalSpacing.css";
import "./09_styles/lightTheme.css";
import "./09_styles/darkTheme.css";
import "./09_styles/App.css";
import "./09_styles/globalColorsNew.css";

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <ProfileProvider>
          <Router>
            <Suspense fallback={<p>Loading...</p>}>
              <PublicHeader />
              <Routes>
                <Route path="/test" element={<Test />} />
                <Route path="/" element={<Home />} />
                <Route
                  path="/:lang/bio"
                  element={
                    <LanguageRouteWrapper>
                      <Bio />
                    </LanguageRouteWrapper>
                  }
                />
                <Route
                  path="/:lang/journey"
                  element={
                    <LanguageRouteWrapper>
                      <Journey />
                    </LanguageRouteWrapper>
                  }
                />
                <Route
                  path="/:lang/projects"
                  element={
                    <LanguageRouteWrapper>
                      <Projects />
                    </LanguageRouteWrapper>
                  }
                />
                <Route
                  path="/:lang/skills"
                  element={
                    <LanguageRouteWrapper>
                      <Skills />
                    </LanguageRouteWrapper>
                  }
                />
                <Route
                  path="/:lang/education"
                  element={
                    <LanguageRouteWrapper>
                      <Education />
                    </LanguageRouteWrapper>
                  }
                />
                <Route
                  path="/:lang/achievements"
                  element={
                    <LanguageRouteWrapper>
                      <Achievements />
                    </LanguageRouteWrapper>
                  }
                />
                <Route
                  path="/:lang/vision"
                  element={
                    <LanguageRouteWrapper>
                      <Vision />
                    </LanguageRouteWrapper>
                  }
                />
                <Route
                  path="/:lang/values"
                  element={
                    <LanguageRouteWrapper>
                      <Values />
                    </LanguageRouteWrapper>
                  }
                />
                <Route
                  path="/:lang/contact"
                  element={
                    <LanguageRouteWrapper>
                      <Contact />
                    </LanguageRouteWrapper>
                  }
                />
                {/* // ? Fallback routes without language prefix */}
                <Route path="/bio" element={<Bio />} />
                <Route path="/journey" element={<Journey />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/skills" element={<Skills />} />
                <Route path="/education" element={<Education />} />
                <Route path="/achievements" element={<Achievements />} />
                <Route path="/vision" element={<Vision />} />
                <Route path="/values" element={<Values />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
              <PublicFooter />
            </Suspense>
          </Router>
        </ProfileProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
