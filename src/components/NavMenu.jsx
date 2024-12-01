import {
  ActivityLogIcon,
  HomeIcon,
  PersonIcon,
  QuestionMarkIcon,
} from "@radix-ui/react-icons";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";

export default function NavMenu() {
  return (
    <NavigationMenu.Root>
      <NavigationMenu.List>
        <NavigationMenu.Item>
          <NavigationMenu.Link className="NavigationMenuLink" href="/">
            Home <HomeIcon />
          </NavigationMenu.Link>
        </NavigationMenu.Item>
        <NavigationMenu.Item>
          <NavigationMenu.Link className="NavigationMenuLink" href="/about">
            About <QuestionMarkIcon />
          </NavigationMenu.Link>
        </NavigationMenu.Item>
        <NavigationMenu.Item>
          <NavigationMenu.Link className="NavigationMenuLink" href="/posts">
            Posts <ActivityLogIcon />
          </NavigationMenu.Link>
        </NavigationMenu.Item>
        <NavigationMenu.Item>
          <NavigationMenu.Link className="NavigationMenuLink" href="/users">
            Users <PersonIcon />
          </NavigationMenu.Link>
        </NavigationMenu.Item>
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
}
