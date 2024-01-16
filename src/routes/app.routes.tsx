import {
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs'
import { DefaultTheme } from '@react-navigation/native'
import { useTheme } from 'native-base'

import HistorySvg from '@/assets/history.svg'
import HomeSvg from '@/assets/home.svg'
import ProfileSvg from '@/assets/profile.svg'
import { Exercise } from '@/Screens/Exercise'
import { History } from '@/Screens/History'
import { Home } from '@/Screens/Home'
import { Profile } from '@/Screens/Profile'

type AppRoutes = {
  home: undefined
  history: undefined
  profile: undefined
  exercise: undefined
}

export type AppRoutesProps = BottomTabNavigationProp<AppRoutes>

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>()

export function AppRoutes() {
  const { sizes } = useTheme()

  const iconSize = sizes['6']

  return (
    <Navigator screenOptions={{ headerShown: false, tabBarShowLabel: false }}>
      <Screen
        name="home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <HomeSvg fill={color} width={iconSize} height={iconSize} />
          ),
        }}
      />
      <Screen
        name="history"
        component={History}
        options={{
          tabBarIcon: ({ color }) => (
            <HistorySvg fill={color} width={iconSize} height={iconSize} />
          ),
        }}
      />
      <Screen
        name="profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => (
            <ProfileSvg fill={color} width={iconSize} height={iconSize} />
          ),
        }}
      />
      <Screen name="exercise" component={Exercise} />
    </Navigator>
  )
}
