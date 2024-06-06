export const FormSection = ({ title, children, className }) => (
  <div className={`form_box ${className ? className : ""}`}>
    {title && <h1 className="form_title">{title}</h1>}
    {children}
  </div>
);

export const FormItem = ({ label, type, name, className, placeholder, onChange }) => (
  <div className={`form_item ${className ? className : ""}`}>
    <label className="form_label">{label}</label>
    <input
      className={`form_input ${className ? className : ""}`}
      type={type}
      name={name}
      placeholder={placeholder}
      onChange={onChange}
    />
  </div>
);

export const FormTextArea = ({ label, onChange }) => (
  <div className="form_item">
    <label className="form_label">{label}</label>
    <textarea className="form_input" onChange={onChange}></textarea>
  </div>
);

export const RadioItem = ({ id, name, label, checked, onChange, value }) => (
  <div className="radio_item">
    <input
      type="radio"
      id={id}
      name={name}
      onChange={onChange}
      checked={checked}
      value={value}
      className="checkbox_form-input"
    />
    <label className="form_label checked_box-form-label" htmlFor={id}>
      {label}
    </label>
  </div>
);
export const CheckboxItem = ({ id, label, checked, onChange }) => (
  <div className="checkbox_item">
    <input
      className="checkbox_form-input"
      type="checkbox"
      id={id}
      checked={checked}
      onChange={onChange}
    />
    <label className="form_label checked_box-form-label" htmlFor={id}>
      {label}
    </label>
  </div>
);

export const PromocodeInput = ({ onChange }) => (
  <div className="promocode_box">
    <p>
      Введите <span>ПРОМОКОД:</span>
    </p>
    <input className="form_input" type="text" onChange={onChange} />
    <Button className="add__cart-btn" label="Применить" />
  </div>
);

export const Button = ({ label, className, onClick }) => (
  <button className={`button ${className ? className : ""}`} onClick={onClick}>{label}</button>
);
