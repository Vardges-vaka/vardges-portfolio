import React from "react";
import { useCK_dashboard } from "./03_cK_dashboard_hooks/_cK_dashboard_hooks.index.js";
import "./_styles/cK_dashboard.css";

const CK_dashboard = () => {
  const { TOAST } = useCK_dashboard();

  const fakeSave = () =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.3) resolve({ ok: true });
        else reject(new Error("Network unreachable"));
      }, 1500);
    });

  const fakeApiError = {
    response: {
      data: {
        success: false,
        message: "Branch name already exists.",
      },
    },
  };

  return (
    <div>
      <h1>CK_dashboard</h1>

      <div
        style={{
          display: "flex",
          gap: 8,
          flexWrap: "wrap",
          marginTop: 16,
        }}
      >
        <button
          type="button"
          onClick={() =>
            TOAST.success({
              title: "Saved",
              message: "Branch updated successfully.",
            })
          }
        >
          success
        </button>
        <button
          type="button"
          onClick={() =>
            TOAST.error({
              title: "Failed",
              message: "Could not save changes. Try again.",
            })
          }
        >
          error
        </button>
        <button
          type="button"
          onClick={() =>
            TOAST.warning({
              title: "Heads up",
              message: "This contract expires in 7 days.",
            })
          }
        >
          warning
        </button>
        <button
          type="button"
          onClick={() =>
            TOAST.info({
              title: "FYI",
              message: "Daily review sync ran at 09:00.",
            })
          }
        >
          info
        </button>
        <button
          type="button"
          onClick={() =>
            TOAST.promise(fakeSave(), {
              loading: { title: "Saving…", message: "Updating branch details." },
              success: { title: "Saved", message: "Branch updated successfully." },
              error: (err) => ({
                title: "Failed",
                message: err?.message || "Try again.",
              }),
            })
          }
        >
          promise
        </button>
        <button
          type="button"
          onClick={() => TOAST.notifyApiError(fakeApiError)}
        >
          notifyApiError
        </button>
        <button type="button" onClick={() => TOAST.clear()}>
          clear all
        </button>
      </div>
    </div>
  );
};

export default CK_dashboard;
