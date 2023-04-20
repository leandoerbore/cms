import { ReactNode } from "react";

const ContentComponent = ({ children }: { children: ReactNode }): JSX.Element => <div className="content">{children}</div>
export { ContentComponent as Content }