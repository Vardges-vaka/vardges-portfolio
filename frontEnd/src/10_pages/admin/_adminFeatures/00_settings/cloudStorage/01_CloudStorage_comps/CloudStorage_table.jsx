import { Fragment } from "react";
import { CloudStorage_ProviderRow } from "./_CloudStorage_comps.index.js";
import "../_styles/cloudStorage_table.css";

const CloudStorage_table = ({ states, compProps }) => {
  if (states.loading) return null;

  return (
    <Fragment>
      <div className="storage-table-wrap">
        <table className="storage-table">
          <thead>
            <tr>
              <th className="col-num center">#</th>
              <th className="col-logo center">Logo</th>
              <th className="col-name">Provider Name</th>
              <th className="col-url-cell thh">Console URL</th>
              <th className="col-files">Files</th>
              <th className="col-usage">Usage</th>
              <th className="col-payment center">Payment</th>
              <th className="col-enabled center">Enabled</th>
              <th className="col-default center">Default</th>
              <th className="col-expiry center">Custom Expiry</th>
              <th className="col-expand center">Info</th>
            </tr>
          </thead>
          <tbody>
            {states.providers.map((provider, index) => (
              <CloudStorage_ProviderRow
                key={provider.id}
                index={index}
                provider={provider}
                states={compProps.CS_ProviderRow_props.states}
                handlers={compProps.CS_ProviderRow_props.handlers}
              />
            ))}
          </tbody>
        </table>
      </div>
    </Fragment>
  );
};

export default CloudStorage_table;
