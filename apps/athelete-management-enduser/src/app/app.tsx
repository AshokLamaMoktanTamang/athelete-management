import { RouterProvider } from "react-router-dom";

import Routes from '@routes/main.route'

export function App() {
  return (<RouterProvider router={Routes} />);
}

export default App;
