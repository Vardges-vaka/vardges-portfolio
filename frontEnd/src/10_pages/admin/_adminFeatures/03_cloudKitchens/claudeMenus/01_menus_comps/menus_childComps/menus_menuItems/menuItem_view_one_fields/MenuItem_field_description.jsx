import { useState } from "react";
import { ShoppingCart, Pencil, Globe, Star } from "lucide-react";
import {
  Menus_iconUpdateBtn,
  Menus_translations,
} from "../../_menus_childComps.index.js";
import "../../../../_styles/menus_childComps/menus_menuItems/menuItem_view_one_fields/menuItem_field_description.css";

/* ============================================================================
   MenuItem_field_description — short + long descriptions, each with its own
   translations panel (toggled via Globe). Aggregator + website + google
   versions toggleable from the header controls.
============================================================================ */

const MenuItem_field_description = ({ states, handlers, menuItem }) => {
  const [showAggr, setShowAggr] = useState(false);
  const [showWebsite, setShowWebsite] = useState(false);
  const [showGoogle, setShowGoogle] = useState(false);
  const [showShortTrans, setShowShortTrans] = useState(false);
  const [showLongTrans, setShowLongTrans] = useState(false);

  if (!menuItem) return null;
  const desc = menuItem.description || {};

  const updatingShort = states.updatingField === "description.short";
  const updatingLong = states.updatingField === "description.long";
  const lockedByOther =
    !!states.isUpdating ||
    (!!states.updatingField &&
      !updatingShort &&
      !updatingLong);

  return (
    <div className="menus_menuItem_view_one_topRight_description">
      <div className="menus_menuItem_view_one_topRight_description_label">
        <label>Descriptions</label>
        <div className="menus_menuItem_view_one_topRight_controlls">
          <Menus_iconUpdateBtn
            icon={<Globe size={16} />}
            tooltip="Website version"
            active={showWebsite}
            onClick={() => setShowWebsite((v) => !v)}
          />
          <Menus_iconUpdateBtn
            icon={<ShoppingCart size={16} />}
            tooltip="Aggregator versions"
            active={showAggr}
            onClick={() => setShowAggr((v) => !v)}
          />
          <Menus_iconUpdateBtn
            icon={<Star size={16} />}
            tooltip="Google version"
            active={showGoogle}
            onClick={() => setShowGoogle((v) => !v)}
          />
        </div>
      </div>

      <div className="menus_menuItem_view_one_topRight_description_versions">
        {/* ---- Short ---- */}
        <div className="menus_menuItem_view_one_topRight_description_version short">
          <div className="menus_menuItem_view_one_topRight_description_version_label">
            <label>Short</label>
            <div style={{ display: "inline-flex", gap: 2 }}>
              <Menus_iconUpdateBtn
                icon={<Globe size={16} />}
                tooltip="Translations"
                active={showShortTrans}
                onClick={() => setShowShortTrans((v) => !v)}
              />
              <Menus_iconUpdateBtn
                icon={<Pencil size={16} />}
                tooltip="Update Short Description"
                active={updatingShort}
                disabled={lockedByOther}
                onClick={() =>
                  handlers.startFieldUpdate?.(
                    "description.short",
                    desc.short?.en ?? "",
                  )
                }
              />
            </div>
          </div>
          <textarea
            className="menus_menuItem_view_one_topRight_description_textarea"
            rows={5}
            defaultValue={desc.short?.en ?? ""}
            readOnly={!updatingShort}
          />
          {showShortTrans && (
            <Menus_translations
              title="Short — translations"
              data={desc.short}
              readOnly={!updatingShort}
              multiline
            />
          )}
        </div>

        {/* ---- Long ---- */}
        <div className="menus_menuItem_view_one_topRight_description_version long">
          <div className="menus_menuItem_view_one_topRight_description_version_label">
            <label>Long</label>
            <div style={{ display: "inline-flex", gap: 2 }}>
              <Menus_iconUpdateBtn
                icon={<Globe size={16} />}
                tooltip="Translations"
                active={showLongTrans}
                onClick={() => setShowLongTrans((v) => !v)}
              />
              <Menus_iconUpdateBtn
                icon={<Pencil size={16} />}
                tooltip="Update Long Description"
                active={updatingLong}
                disabled={lockedByOther}
                onClick={() =>
                  handlers.startFieldUpdate?.(
                    "description.long",
                    desc.long?.en ?? "",
                  )
                }
              />
            </div>
          </div>
          <textarea
            className="menus_menuItem_view_one_topRight_description_textarea"
            rows={5}
            defaultValue={desc.long?.en ?? ""}
            readOnly={!updatingLong}
          />
          {showLongTrans && (
            <Menus_translations
              title="Long — translations"
              data={desc.long}
              readOnly={!updatingLong}
              multiline
            />
          )}
        </div>
      </div>

      {showAggr && (
        <Menus_translations
          title="Description — aggregator versions"
          data={desc.aggrigators}
        />
      )}
      {showWebsite && desc.website && (
        <Menus_translations
          title="Website version"
          data={{ short: desc.website.short, long: desc.website.long }}
        />
      )}
      {showGoogle && desc.google && (
        <div className="menus_translations">
          <p className="menus_translations_title">Google version</p>
          <div className="menus_translations_row">
            <span className="menus_translations_flag">G</span>
            <input
              className="menus_translations_input"
              defaultValue={desc.google}
              readOnly
            />
            <span className="menus_translations_code">G</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuItem_field_description;
