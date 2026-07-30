// =============================================================
// vireokit — public entry (barrel export)
// Consumers: import { Button, Modal } from "vireokit";
// Styles:    import "vireokit/styles";  (see package exports)
// =============================================================

// theme
export { ThemeProvider, useTheme } from "./theme/ThemeProvider";

// primitives
export { default as Button } from "./components/Buttons";
export { Input } from "./components/Input";
export { Select } from "./components/Select";
export { Badge } from "./components/Badge";
export { Avatar } from "./components/Avatar";
export { Icon } from "./components/Icon";

// overlays & feedback
export { Modal } from "./components/Modal";
export { default as Drawer } from "./components/drawer";
export { Popover } from "./components/Popover";
export { Loading } from "./components/Loading";
export { Skeleton } from "./components/Skeleton";
export { NotificationProvider, useNotification } from "./components/Notifications";

// data & navigation
export { default as Table } from "./components/Table";
export { default as TableContainer } from "./components/Table/TableContainer";
export { Pagination } from "./components/Pagination";
export { default as Tab } from "./components/Tab";
export { Breadcrumb } from "./components/Breadcrumb";
export { Divider } from "./components/Divider";

// layout shell
export { Layout } from "./components/Layout";
export { Sidebar } from "./components/Sidebar";
export { Topbar } from "./components/Topbar";
