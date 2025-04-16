# @sahilphondekar/react-component-library

A lightweight React component library built with **Vite**, **React**, and **pure CSS** — no Tailwind, no UI frameworks.

## 📦 Installation

```bash
npm install @sahilphondekar/react-component-library
```

## 🚀 Usage

1. **Import global CSS** (in `main.jsx` or `App.jsx`):

```js
import "@sahilphondekar/react-component-library/dist/react-component-library.css";
```

2. **Use components**:

```js
import { Button } from "@sahilphondekar/react-component-library";

function App() {
  return <Button onClick={() => alert("Clicked!")}>Click Me</Button>;
}
```


---

Here’s the complete list of components for your React + CSS Module library, organized hierarchically by category and subcategory for admin/dashboard projects:

---

### **1. Typography**
- `Text` (paragraphs, spans, small text)
- `Heading` (h1-h6 with consistent sizes)
- `Label` (form field labels)
- `Code` (inline code snippets)
- `Blockquote`

### **2. Layout**
- `Box` (spacing wrapper)
- `Container` (max-width constrained)
- `Grid` (responsive grid system)
- `Stack` (vertical/horizontal spacing)
- `Divider` (horizontal/vertical rules)
- `Flex` (flexbox utility)

### **3. Buttons & Actions**
- `Button` (primary, secondary, ghost)
- `IconButton` (button with icon only)
- `ButtonGroup` (joined buttons)
- `FAB` (Floating Action Button)
- `DropdownButton` (with menu)

### **4. Forms**
- `Input` (text, email, password)
- `Textarea`
- `Select` (native dropdown)
- `Checkbox`
- `Radio`
- `Toggle` (switch)
- `Slider` (range input)
- `FileUpload`
- `DatePicker`
- `FormGroup` (wrapper for labels/errors)
- `ValidationError` (form error message)

### **5. Data Display**
- `Badge` (status indicators)
- `Tag` / `Chip` (filter/status tags)
- `Avatar` (user thumbnails)
- `Table` (with sorting/pagination)
- `DataGrid` (advanced table)
- `Card` (with header/footer)
- `Accordion` (collapsible content)
- `Tooltip` (hover info)
- `Progress` (linear/circular)

### **6. Navigation**
- `Breadcrumbs`
- `Tabs` (horizontal/vertical)
- `Pagination`
- `Sidebar` / `NavMenu`
- `Stepper` (multi-step forms)

### **7. Overlays & Modals**
- `Modal` (dialog popup)
- `Drawer` (side panel)
- `Toast` (notification)
- `Alert` (inline messages)
- `Popover` (contextual floating panel)
- `Tooltip`

### **8. Feedback & Status**
- `Spinner` (loading indicator)
- `Skeleton` (loading placeholder)
- `Alert` (success/error/warning)
- `EmptyState` (no-data placeholder)

### **9. Dashboard-Specific**
- `StatCard` (metric KPIs)
- `Chart` (wrapper for charts)
- `FilterBar` (complex filters)
- `KanbanBoard`
- `Timeline`

### **10. Utilities**
- `ClickOutsideWrapper`
- `Portal` (render outside DOM hierarchy)
- `Responsive` (show/hide based on breakpoints)
- `ThemeProvider` (theme context)

---

### **Notes**:
- **Atomic Design**: Starts small (`Text`, `Button`) → compounds (`FormGroup`, `Card`).
- **Configurable**: Each component supports variants (size, color, state).
- **Theme-Ready**: Uses CSS variables for theming.

Need adjustments or want to prioritize a specific category?