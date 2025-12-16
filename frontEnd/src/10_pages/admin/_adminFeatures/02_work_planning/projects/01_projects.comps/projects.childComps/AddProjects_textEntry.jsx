import "../../00_styles/addProjects_textEntry.css";

const AddProjects_textEntry = ({ state, items, onChange, onBlur, title }) => {
  const renderSwitch = (item) => {
    if (!item) return;

    const { field, lng } = item;
    const fieldValue = state[field];
    const subfieldValue = fieldValue[item.subField];
    const value =
      title === "Title" ? fieldValue[lng].value : subfieldValue[lng].value;

    return title === "Title" ? (
      <input
        id={`title-input-${lng}`}
        type="text"
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        data-field={field}
        data-lng={lng}
        name={`${field}.${lng} `}
      />
    ) : (
      <textarea
        id={`title-input-${lng}`}
        type="text"
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        data-field={field}
        data-lng={lng}
        data-subfield={item.subField}
        name={`${field}.${lng} `}
      />
    );
  };
  const renderFieldMsg = (item) => {
    if (!item) return;
    const { field, lng } = item;
    const fieldValue = state[field];
    const subfieldValue = fieldValue[item.subField];
    const value = title === "Title" ? fieldValue[lng] : subfieldValue[lng];
    const isTouched = value.isTouched;
    const isError = value.isError;
    const errorMessage = value.errorMessage;
    return (
      isTouched &&
      isError && (
        <p className="AddProjects_textEntry_validationError">{errorMessage}</p>
      )
    );
  };
  return (
    <div className="">
      <div className="AddProjects_text_cnt">
        <h1>{title}</h1>

        {items.map((item) => (
          <div
            className="AddProjects_title_field"
            key={`${item.field}-${item.lng}`}>
            <label htmlFor={`title-input-${item.lng}`}>{item.label}</label>
            {renderSwitch(item)}
            {renderFieldMsg(item)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddProjects_textEntry;
