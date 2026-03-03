export type TabName = 'home' | 'settings' | 'profile';

export interface BottomTabBarProps {
  activeTab: TabName;
  onTabPress: (tabName: TabName) => void;
}