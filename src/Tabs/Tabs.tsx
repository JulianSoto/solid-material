import { createEffect, For, mergeProps } from "solid-js";
import { MDCTabBar } from "@material/tab-bar";
import classNames from "classnames";
import "./Tabs.scss";

interface TabsProps {
  tabList: { textLabel: string }[];
  defaultActiveIndex?: number;
  onActiveChange?: (index: number) => void;
}

const Tabs = (_props: TabsProps) => {
  const props = mergeProps({ defaultActiveIndex: 0 } as TabsProps, _props);
  let tabBarElement: HTMLDivElement | undefined;
  let tabBar: MDCTabBar | undefined;

  createEffect(() => {
    if (tabBarElement) {
      tabBar = new MDCTabBar(tabBarElement);
      tabBar.listen("MDCTabBar:activated", ({ detail }: any) => {
        props.onActiveChange?.(detail.index);
      });
    }
  });

  return (
    <div class="mdc-tab-bar" ref={(el) => (tabBarElement = el)} role="tablist">
      <div class="mdc-tab-scroller">
        <div class="mdc-tab-scroller__scroll-area">
          <div class="mdc-tab-scroller__scroll-content">
            <For each={props.tabList}>
              {(tab, index) => (
                <button
                  class={classNames({
                    "mdc-tab": true,
                    "mdc-tab--active": props.defaultActiveIndex === index(),
                  })}
                  role="tab"
                  aria-selected={
                    props.defaultActiveIndex === index() ? "true" : "false"
                  }
                  tabindex={props.defaultActiveIndex === index() ? "0" : "-1"}
                >
                  <span class="mdc-tab__content">
                    {/*
                    <span class="mdc-tab__icon material-icons" aria-hidden="true">
                      icon
                    </span>
                    */}
                    <span class="mdc-tab__text-label">{tab.textLabel}</span>
                  </span>
                  <span
                    class={classNames({
                      "mdc-tab-indicator": true,
                      "mdc-tab-indicator--active":
                        props.defaultActiveIndex === index(),
                    })}
                  >
                    <span class="mdc-tab-indicator__content mdc-tab-indicator__content--underline"></span>
                  </span>
                  <span class="mdc-tab__ripple"></span>
                </button>
              )}
            </For>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Tabs };
