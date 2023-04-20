import { ReactNode } from "react"
import { Content } from "./Content"
import { Menu } from "./Menu"
import { Layout } from "antd"
import Head from "./Header"

const { Sider, Header } = Layout;

const LayoutComponent = ({ children }: { children: ReactNode | ReactNode[] }): JSX.Element => {

    return (
        <>
            <main className="layout">
                <Layout >
                    <Sider>
                        <Menu />
                    </Sider>
                    <Layout style={{ backgroundColor: "#ffffff" }}>
                        <Header style={{ display: "flex", justifyContent: "center", background: "transparent", backgroundColor: "#ffffff" }}>
                            <Head />
                        </Header>
                        <Content>
                            {children}
                        </Content>
                    </Layout>
                </Layout>
            </main >
        </>

    )
}

export { LayoutComponent as Layout };