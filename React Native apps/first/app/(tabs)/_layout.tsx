import { tabs } from "@/constants/data";
import { Tabs } from "expo-router";
import React from "react";
import clsx from "clsx";
import { View } from "react-native";
import {Image} from "expo-image"

const TabLayout = () => {
  const TabIcon = ({focused, icon}: TabIconProps)=>{
    return (
      <View className="tabs-icon">
        <View className={clsx('tabs-pill', focused && 'tabs-acive')}>
          <Image source={icon} className="text-glyph"/>
        </View>
      </View>
    )
  }
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      {tabs.map((tab) => {
        return (
          <Tabs.Screen
            key={tab.name}
            name={tab.name}
            options={{ title: tab.title,
              tabBarIcon: 
             }}
          />
        );
      })}
    </Tabs>
  );
};

export default TabLayout;
