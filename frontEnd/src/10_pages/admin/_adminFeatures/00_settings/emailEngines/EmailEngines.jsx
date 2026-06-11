import { useState } from "react";
import { Input_text ,   Recipe_Icon,
  Supplier_Icon,
  SalesChannel_Icon,} from "../../../../../01_components/_components.index.js";
import "./testing.css";

const EmailEngines = () => {
  const [value, setValue] = useState("");

  const handleChange = (e) => setValue(e.target.value);

  return (
    <div className="emailEnginesTest">
      <h1 className="emailEnginesTest__title">Input_text playground</h1>

      <section className="emailEnginesTest__section">
        <h2>Hints — hint / error / success</h2>
        <Input_text
          sizeType="sm"
          labelProps={{ isActive: true, message: "Username" }}
          hintsProps={{
            isActive: true,
            type: "hint",
            message: "3–20 characters, letters and numbers only.",
          }}
          placeholder="vardges"
        />
        <Input_text
          sizeType="md"
          labelProps={{ isActive: true, message: "API key" }}
          hintsProps={{
            isActive: true,
            type: "error",
            message: "This key is invalid or expired.",
          }}
          defaultValue="sk-invalid"
        />
        <Input_text
          sizeType="lg"
          labelProps={{ isActive: true, message: "Webhook URL" }}
          hintsProps={{
            isActive: true,
            type: "success",
            message: "URL verified successfully.",
          }}
          defaultValue="https://hooks.example.com/ok"
        />
      </section>

      <section className="emailEnginesTest__section">
        <h2>Full combo (lg)</h2>
        <Input_text
          sizeType="lg"
          // required
          labelProps={{
            isActive: true,
            message: "Engine name",
            
            iconProps: {
              isActive: true,
              position: "right",
              type: "svg",
              svg_src: Recipe_Icon(),
              // lucidIcon: "Info",
              title: "Shown on your dashboard",
            },
          }}
          leftIconProps={{
            isActive: true,
            type: "lucide",
            lucidIcon: "AtSign",
          }}
          rightIconProps={{
            isActive: true,
            type: "lucide",
            lucidIcon: "CircleHelp",
            title: "Help",
          }}
          hintsProps={{
            isActive: true,
            type: "hint",
            message: "Pick a unique name for this email engine.",
          }}
          placeholder="Transactional — prod"
          value={value}
          onChange={handleChange}
          data_field_name="engineName"
        />
      </section>

      <section className="emailEnginesTest__section">
        <h2>Disabled</h2>
        <Input_text
          disabled
          labelProps={{ isActive: true, message: "Read only" }}
          defaultValue="Cannot edit"
        />
      </section>
    </div>
  );
};

export default EmailEngines;
