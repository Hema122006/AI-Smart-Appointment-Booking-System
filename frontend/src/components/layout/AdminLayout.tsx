import Sidebar from "./Sidebar";

function AdminLayout({ children }: any) {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <div
  style={{
    marginLeft: "260px",
    width: "calc(100% - 260px)",
    minHeight: "100vh",
    padding: "30px",

    backgroundImage:
      "linear-gradient(rgba(255,255,255,0.55), rgba(255,255,255,0.35)), url('/images/hospital-bg.png')",

    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",

    overflowX: "auto",
  }}
      >
        {children}
      </div>
    </div>
  );
}

export default AdminLayout;