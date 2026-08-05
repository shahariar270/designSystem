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
export { Checkbox } from "./components/Checkbox";
export { RadioGroup } from "./components/RadioGroup";

export { Switch } from "./components/Switch";
export { Select } from "./components/Select";
export { Badge } from "./components/Badge";
export { Avatar } from "./components/Avatar";
export { Icon } from "./components/Icon";

// overlays & feedback
export { Modal } from "./components/Modal";
export { default as Drawer } from "./components/drawer";
export { Popover } from "./components/Popover";
export { Tooltip } from "./components/Tooltip";
export { Alert } from "./components/Alert";
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

// v0.2.0 — dashboard & data primitives
export { Card } from "./components/Card";
export { DropdownMenu } from "./components/DropdownMenu";
export { EmptyState } from "./components/EmptyState";
export { ConfirmDialog } from "./components/ConfirmDialog"; from "./components/Card";
export { StatCard } from "./components/StatCard";
export { BarChart } from "./components/BarChart";
export { AreaChart } from "./components/AreaChart";
export { ProgressList } from "./components/ProgressList";
export { ImageUpload } from "./components/ImageUpload";
export { ImageFallback } from "./components/ImageFallback";

