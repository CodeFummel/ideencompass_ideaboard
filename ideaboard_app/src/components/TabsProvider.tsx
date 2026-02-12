import React, {createContext, useState} from "react";
import {TabsProps} from "antd";

type Items = NonNullable<TabsProps["items"]>;

export const TabsContext = createContext<{
    activeKey: string,
    setActiveKey: React.Dispatch<React.SetStateAction<string>>,
    items: Items,
    setItems: React.Dispatch<React.SetStateAction<Items>>,
    removeItem: (keyName: string) => void,
}>({
    activeKey: "",
    items: [],
    setActiveKey(): void {},
    setItems(): void {},
    removeItem(keyName: string): void{},
});

export const TabsProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const [activeKey, setActiveKey] = useState("ideas-tab");
    const [items, setItems] = useState<Items>([]);

    const removeItem = (keyName: string) => {
        const newPanes = items.filter((pane) => pane.key !== keyName);
        setActiveKey("ideas-tab")
        setItems(newPanes);
    };

    return (
        <TabsContext value={{activeKey, setActiveKey, items, setItems, removeItem}}>
            {children}
        </TabsContext>
    )
}