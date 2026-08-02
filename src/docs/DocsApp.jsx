import { Routes, Route } from "react-router-dom";
import { DocsLayout } from "./DocsLayout";
import "./docs.scss";

import Intro from "./pages/Intro";
import Theming from "./pages/Theming";
import Demo from "./pages/Demo";
import ButtonDoc from "./pages/ButtonDoc";
import InputDoc from "./pages/InputDoc";
import CheckboxDoc from "./pages/CheckboxDoc";
import SwitchDoc from "./pages/SwitchDoc";
import SelectDoc from "./pages/SelectDoc";
import BadgeDoc from "./pages/BadgeDoc";
import AvatarDoc from "./pages/AvatarDoc";
import IconDoc from "./pages/IconDoc";
import ModalDoc from "./pages/ModalDoc";
import DrawerDoc from "./pages/DrawerDoc";
import PopoverDoc from "./pages/PopoverDoc";
import TooltipDoc from "./pages/TooltipDoc";
import ToastDoc from "./pages/ToastDoc";
import LoadingDoc from "./pages/LoadingDoc";
import SkeletonDoc from "./pages/SkeletonDoc";
import TableDoc from "./pages/TableDoc";
import PaginationDoc from "./pages/PaginationDoc";
import TabsDoc from "./pages/TabsDoc";
import BreadcrumbDoc from "./pages/BreadcrumbDoc";
import DividerDoc from "./pages/DividerDoc";
import LayoutDoc from "./pages/LayoutDoc";

function DocsRoutes() {
  return (
    <DocsLayout>
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="/theming" element={<Theming />} />
        <Route path="/components/button" element={<ButtonDoc />} />
        <Route path="/components/input" element={<InputDoc />} />
        <Route path="/components/checkbox" element={<CheckboxDoc />} />
        <Route path="/components/switch" element={<SwitchDoc />} />
        <Route path="/components/select" element={<SelectDoc />} />
        <Route path="/components/badge" element={<BadgeDoc />} />
        <Route path="/components/avatar" element={<AvatarDoc />} />
        <Route path="/components/icon" element={<IconDoc />} />
        <Route path="/components/modal" element={<ModalDoc />} />
        <Route path="/components/drawer" element={<DrawerDoc />} />
        <Route path="/components/popover" element={<PopoverDoc />} />
        <Route path="/components/tooltip" element={<TooltipDoc />} />
        <Route path="/components/toast" element={<ToastDoc />} />
        <Route path="/components/loading" element={<LoadingDoc />} />
        <Route path="/components/skeleton" element={<SkeletonDoc />} />
        <Route path="/components/table" element={<TableDoc />} />
        <Route path="/components/pagination" element={<PaginationDoc />} />
        <Route path="/components/tabs" element={<TabsDoc />} />
        <Route path="/components/breadcrumb" element={<BreadcrumbDoc />} />
        <Route path="/components/divider" element={<DividerDoc />} />
        <Route path="/components/layout" element={<LayoutDoc />} />
        <Route path="*" element={<Intro />} />
      </Routes>
    </DocsLayout>
  );
}

export default function DocsApp() {
  return (
    <Routes>
      {/* full-screen dashboard, outside the docs chrome */}
      <Route path="/demo" element={<Demo />} />
      <Route path="/*" element={<DocsRoutes />} />
    </Routes>
  );
}
