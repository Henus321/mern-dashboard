import CookieConsent from "react-cookie-consent";

export const CookieReminder = () => {
  return (
    <CookieConsent
      location="bottom"
      expires={90}
      style={{
        backgroundColor: "rgba(0,0,0,0.75",
        padding: "0 50px",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "justify",
      }}
      buttonStyle={{
        backgroundColor: "#1DA57A",
        color: "#fff",
        borderRadius: "5px",
        padding: "8px 16px",
      }}
      buttonText="Accept and close"
    >
      We use cookies to make your experience of our websites better. By using
      and further navigating this website you accept this.
    </CookieConsent>
  );
};
