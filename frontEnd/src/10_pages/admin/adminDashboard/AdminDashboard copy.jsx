import React, { useState, lazy, Suspense, useEffect } from "react";

import { useNavigate, useParams } from "react-router-dom";
import { useUserContext } from "../../../02_context/context.index";
import { AdminSignOut_helper } from "../../../05_helpers/apiHelpers/_apiHelpers.index.js";
import { useTranslation } from "react-i18next";
import {
  settings_SIdeBar,
  me_SideBar,
  work_planning_SideBar,
  business_docs_SideBar,
  assets_storage_SideBar,
  tools_SideBar,
  brand_product_SideBar,
} from "../_adminFeatures/adminFeatures.index.js";
import { AdminSideBar } from "../../adminPageComps/_adminPageComps.index.js";

import "./00_styles/adminDashboard.css";

const AdminDashboard = () => {
  const { user, logout } = useUserContext();
  const navigate = useNavigate();
  const { t } = useTranslation("validators");
  const { t: tCommon } = useTranslation("common");
  const { t: tSideBar } = useTranslation("sideBar");
  const { section } = useParams();
  const [isPinned, setIsPinned] = useState(false);
  const handlePinClick = () => {
    setIsPinned(!isPinned);
  };

  const componentMap = {
    me: {
      Ai: lazy(() => import("../_adminFeatures/01_me/ai/Ai.jsx")),
      Health: lazy(() => import("../_adminFeatures/01_me/health/Health.jsx")),
    },
    work_planning: {
      Calendar: lazy(() =>
        import("../_adminFeatures/02_work_planning/calendar/Calendar.jsx")
      ),
      Countdown: lazy(() =>
        import("../_adminFeatures/02_work_planning/countdown/Countdown.jsx")
      ),
      Projects: lazy(() =>
        import("../_adminFeatures/02_work_planning/projects/Projects.jsx")
      ),
      To_do_list: lazy(() =>
        import("../_adminFeatures/02_work_planning/to_do_list/To_do_list.jsx")
      ),
      TravelPlanner: lazy(() =>
        import(
          "../_adminFeatures/02_work_planning/travelPlanner/TravelPlanner.jsx"
        )
      ),
    },
    Business_docs: {
      CV_Generator: lazy(() =>
        import(
          "../_adminFeatures/03_business_docs/CV_Generator/CV_Generator.jsx"
        )
      ),
      EmailTools: lazy(() =>
        import("../_adminFeatures/03_business_docs/emailTools/EmailTools.jsx")
      ),
      ExcelGenerator: lazy(() =>
        import(
          "../_adminFeatures/03_business_docs/excelGenerator/ExcelGenerator.jsx"
        )
      ),
      FinTracker: lazy(() =>
        import("../_adminFeatures/03_business_docs/finTracker/FinTracker.jsx")
      ),
      PDF_image_Formatting: lazy(() =>
        import(
          "../_adminFeatures/03_business_docs/PDF_image_Formatting/PDF_image_Formatting.jsx"
        )
      ),
    },
    Assets_storage: {
      CloudStorage: lazy(() =>
        import(
          "../_adminFeatures/04_assets_storage/cloudStorage/CloudStorage.jsx"
        )
      ),
      Vault: lazy(() =>
        import("../_adminFeatures/04_assets_storage/vault/Vault.jsx")
      ),
      PersonalGallery: lazy(() =>
        import(
          "../_adminFeatures/04_assets_storage/personalGallery/PersonalGallery.jsx"
        )
      ),
      PswManager: lazy(() =>
        import("../_adminFeatures/04_assets_storage/pswManager/PswManager.jsx")
      ),
    },
    tools: {
      MapTools: lazy(() =>
        import("../_adminFeatures/05_tools/mapTools/MapTools.jsx")
      ),
      QRCode: lazy(() =>
        import("../_adminFeatures/05_tools/QRCode/QRCode.jsx")
      ),
      TemplateGenerator: lazy(() =>
        import(
          "../_adminFeatures/05_tools/templateGenerator/TemplateGenerator.jsx"
        )
      ),
      WordCounter: lazy(() =>
        import("../_adminFeatures/05_tools/wordCounter/WordCounter.jsx")
      ),
    },
    Brand_product: {
      BrandDevelopment: lazy(() =>
        import(
          "../_adminFeatures/06_brand_product/brandDevelopment/BrandDevelopment.jsx"
        )
      ),
      BrandPortfolio: lazy(() =>
        import(
          "../_adminFeatures/06_brand_product/brandPortfolio/BrandPortfolio.jsx"
        )
      ),
      BrandBook: lazy(() =>
        import("../_adminFeatures/06_brand_product/brandBook/BrandBook.jsx")
      ),
      MenuDevelopment: lazy(() =>
        import(
          "../_adminFeatures/06_brand_product/menuDevelopment/MenuDevelopment.jsx"
        )
      ),
      CocktailDevelopment: lazy(() =>
        import(
          "../_adminFeatures/06_brand_product/cocktailDevelopment/CocktailDevelopment.jsx"
        )
      ),
    },
  };

  const sideBarMap = {
    me: me_SideBar(tSideBar),
    work_planning: work_planning_SideBar(tSideBar),
    Business_docs: business_docs_SideBar(tSideBar),
    Assets_storage: assets_storage_SideBar(tSideBar),
    tools: tools_SideBar(tSideBar),
    Brand_product: brand_product_SideBar(tSideBar),
    settings: settings_SIdeBar(tSideBar),
  };
  /*







  const classnames = {
    container: `dashboard-container ${isPinned ? "pinned" : ""} ${version}`,
    aside: `dashboard-sidebar ${isPinned ? "pinned" : ""} ${version}`,
    sidebar: {
      logo: `dashboard-sidebar-logo ${isPinned ? "" : "pinned"} ${version}`,
      pin: `dashboard-sidebar-pin ${isPinned ? "" : "pinned"}`,

      title: `dashboard-sidebar-title ${isPinned ? "pinned" : ""} ${version}`,
      titleSpan: `dashboard-sidebar-title-span ${
        isPinned ? "pinned" : ""
      } ${version}`,
    },
    navBar: {
      container: `dashboard-nav ${isPinned ? "pinned" : ""} ${version}`,
      ul: `dashboard-nav-ul ${isPinned ? "pinned" : ""} ${version}`,
      li: `dashboard-nav-ul-li ${isPinned ? "pinned" : ""} ${version}`,
      icon: `dashboard-nav-sidebar-icon ${isPinned ? "pinned" : ""} ${version}`,
    },
  };
    <div className={classnames.container}>
        <aside className={classnames.aside}>
          <div className={classnames.sidebar.logo}>
            {isPinned ? (
              <OpenModalButton
                id={`pin ${version}`}
                onClick={handlePinClick}
                className={classnames.sidebar.pin} //.button.openModal.pin
                centerIcon={isPinned ? PinIcon : UnPinIcon}
              />
            ) : (
              <>
                <h2 className={classnames.sidebar.title}>
                  <span className={classnames.sidebar.titleSpan}>{name}'s</span>{" "}
                  {t("sidebar.title", "Account")}
                </h2>{" "}
                <OpenModalButton
                  id={`pin ${version}`}
                  onClick={handlePinClick}
                  className={classnames.sidebar.pin} //.button.openModal.pin
                  centerIcon={isPinned ? PinIcon : UnPinIcon}
                />
              </>
            )}
          </div>

          <nav className={classnames.navBar.container}>
            <ul className={classnames.navBar.ul}>
              {sideBarItems
                .find((item) => item.case === roleType)
                ?.ui.map(({ id, label, icon: Icon }) => (
                  <li
                    key={id}
                    onClick={() => setActiveSection(id)}
                    className={classnames.navBar.li}>
                    <a
                      href="#"
                      data-label={label}
                      title={label}
                      className={`dashboard-nav-ul-li-a ${
                        isPinned ? "pinned" : ""
                      } ${version} ${activeSection === id ? "active" : ""}`}>
                      <img
                        src={Icon}
                        alt={`${label} icon`}
                        className={classnames.navBar.icon}
                        width="35"
                        height="35"
                      />
                      {isPinned ? "" : label}
                    </a>
                  </li>
                ))}
            </ul>
          </nav>
        </aside>

        <main className={`dashboard-main-content ${version}`}>
          <header className={`dashboard-header ${version}`}>
            <p>
              {sideBarItems
                .find((item) => item.case === roleType)
                ?.ui.find((item) => item.id === activeSection)?.label || ""}
            </p>
            <div className={`dashboard-controls ${version}`}>
              <OpenModalButton
                id={`help ${version}`}
                children={t("sidebar.help", "Help")}
                onClick={helpBtnOnClick}
                className={`help ${version}`} //.button.openModal.openModal-button-content.help
              />
              <OpenModalButton
                id={`log-out ${version}`}
                children={t("sidebar.logOut", "Log Out")}
                onClick={logOutBtnOnClick}
                className={`log-out ${version}`} //.button.openModal.openModal-button-content.log-out
              />
            </div>
          </header>
          <div
            className={`dashboard-main-rendering-content-wrapper ${version}`}>
            {renderContent(roleType)}
          </div>
        </main>
      </div>















  */

  const handleSignOut = async () => {
    try {
      const response = await AdminSignOut_helper(t, tCommon);
      if (response && response.success) {
        console.log("Sign out successful, clearing user context...");
        // Clear user context
        logout();
        // Redirect to admin welcome page
        navigate("/admin");
      } else {
        console.error("Sign out failed:", response?.message);
      }
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  return (
    <div className="AdminDashboard">
      <h1>AdminDashboard</h1>
      <p>Section: {section}</p>
      <p>Welcome, {user?.name || "Guest"}</p>
      <p>Role: {user?.role || "N/A"}</p>
      <p>ID: {user?._id || "N/A"}</p>
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
};

export default AdminDashboard;
