export const FormSection = ({ title, children }) => (
  <div className="form_box">
    {title && <h1 className="form_title">{title}</h1>}
    {children}
  </div>
);

export const FormItem = ({ label, type, name }) => (
  <div className="form_item">
    <label className="form_label">{label}</label>
    <input className="form_input" type={type} name={name} />
  </div>
);

export const FormTextArea = ({ label }) => (
  <div className="form_item">
    <label className="form_label">{label}</label>
    <textarea className="form_input"></textarea>
  </div>
);

export const RadioItem = ({ id, name, label, checked }) => (
  <div className="radio_item">
    <input type="radio" id={id} name={name} defaultChecked={checked} />
    <label htmlFor={id}>{label}</label>
  </div>
);

export const CheckboxItem = ({ id, label }) => (
  <div className="checkbox_item">
    <input type="checkbox" id={id} />
    <label htmlFor={id}>{label}</label>
  </div>
);

export const PromocodeInput = () => (
  <div className="promocode_box">
    <p>
      Введите <span>ПРОМОКОД:</span>
    </p>
    <input className="form_input" type="text" />
    <Button className="add__cart-btn" label="Применить" />
  </div>
);

export const Button = ({ label, className }) => (
  <button className={`button ${className}`}>{label}</button>
);
