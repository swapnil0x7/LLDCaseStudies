import "./tabForm.css";
import Profile from "./Profile";
import Interest from "./Interest";
import Settings from "./Settings";
import { useState } from "react";

const TabForm = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [formData, setFormData] = useState({
    profile:  { name: "", email: "", phone: "" },
    interest: { hobbies: "", favoriteBook: "" },
    settings: { notifications: false, darkMode: false },
  });
  const [errors, setErrors] = useState({
    profile:  { name: "", email: "", phone: "" },
    interest: { hobbies: "", favoriteBook: "" },
    settings: {},
  });
  const tabs = [
    {
      name: "profile",
      component: Profile,
    },
    {
      name: "interest",
      component: Interest,
    },
    {
      name: "settings",
      component: Settings,
    },
  ];

  const ActiveComponent = tabs[activeTab].component;
  const activeTabName = tabs[activeTab].name;

  const validate = () => {
    const newErrors = {
      profile:  { name: "", email: "", phone: "" },
      interest: { hobbies: "", favoriteBook: "" },
      settings: {},
    };
    let isValid = true;

    if (!formData.profile.name.trim()) {
      newErrors.profile.name = "Name is required";
      isValid = false;
    }
    if (!formData.profile.email.trim()) {
      newErrors.profile.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.profile.email)) {
      newErrors.profile.email = "Enter a valid email";
      isValid = false;
    }
    if (!formData.profile.phone.trim()) {
      newErrors.profile.phone = "Phone is required";
      isValid = false;
    }
    if (!formData.interest.hobbies.trim()) {
      newErrors.interest.hobbies = "Hobbies is required";
      isValid = false;
    }
    if (!formData.interest.favoriteBook.trim()) {
      newErrors.interest.favoriteBook = "Favourite book is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [activeTabName]: { ...prev[activeTabName], [field]: value },
    }));
  };

  return (
    <>
      <div className="outer">
        {tabs.map((tab, index) => {
          return (
            <div
              className="tab"
              key={index}
              onClick={() => setActiveTab(index)}
              style={{
                backgroundColor: activeTab === index ? "yellow" : "white",
              }}
            >
              {tab.name}
            </div>
          );
        })}
      </div>
      <div className="tab-container">
        <ActiveComponent data={formData[activeTabName]} onChange={handleChange} errors={errors[activeTabName]} />
      </div>
      <button
        style={{ margin: "16px" }}
        onClick={() => { if (validate()) console.log("Submitted:", formData); }}
      >
        Submit
      </button>
    </>
  );
};

export default TabForm;
