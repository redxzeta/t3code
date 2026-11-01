import "~/index.css";
import { EnvironmentId, ThreadId, ProviderDriverKind } from "@t3tools/contracts";
import { expect, it, vi } from "vite-plus/test";
import { render } from "../../../test/render";
import { composerCommandKeyHandler } from "./composerCommandKey";
import { ComposerCommandMenu, type ComposerCommandItem } from "./ComposerCommandMenu";

const skills: ComposerCommandItem[] = Array.from({ length: 200 }, (_, index) => ({
  id: `skill-${index}`,
  type: "skill",
  provider: ProviderDriverKind.make("codex"),
  skill: {
    name: `demo-skill-${index}`,
    path: `.agents/skills/demo-skill-${index}/SKILL.md`,
    enabled: true,
    scope: index % 2 === 0 ? "project" : "system",
  },
  label: `demo-skill-${index}`,
  description: "Demo skill with a description about as long as a real one",
}));

it.each(["skill", "slash-command", "path"] as const)(
  "bounds mounted rows and reveals selection for %s",
  async (triggerKind) => {
    const props = {
      listId: "suggestions",
      items:
        triggerKind === "path"
          ? skills.map((item): ComposerCommandItem => ({
              id: item.id,
              type: "path",
              path: item.label,
              pathKind: "file",
              searchTarget: { environmentId: null, cwd: null, query: null },
              label: item.label,
              description: item.description,
            }))
          : skills,
      resolvedTheme: "light" as const,
      isLoading: false,
      triggerKind,
      activeItemId: skills[0]!.id,
      onHighlightedItemChange: vi.fn(),
      onSelect: vi.fn(),
    };
    await using screen = await render(<ComposerCommandMenu {...props} />);
    await vi.waitFor(() => {
      expect(screen.container.querySelectorAll('[role="option"]').length).toBeGreaterThan(0);
      expect(screen.container.querySelectorAll('[role="option"]').length).toBeLessThan(40);
    });
    expect(screen.getByRole("listbox").element().getAttribute("aria-label")).toBe(
      triggerKind === "skill"
        ? "Skills"
        : triggerKind === "path"
          ? "Files and folders"
          : "Commands",
    );
    await screen.rerender(<ComposerCommandMenu {...props} activeItemId={skills[199]!.id} />);
    await expect
      .element(screen.getByRole("option", { name: /(?:demo-skill-199|Demo Skill 199)/ }))
      .toBeVisible();
    const selected = screen.container.querySelector('[aria-selected="true"]')!;
    expect(selected.id).toContain("skill-199");
    expect(selected.getAttribute("aria-posinset")).toBe("200");
    expect(selected.getAttribute("aria-setsize")).toBe("200");
    await vi.waitFor(() => {
      const option = selected.getBoundingClientRect();
      const list = screen.getByRole("listbox").element().getBoundingClientRect();
      expect(option.top).toBeGreaterThanOrEqual(list.top);
      expect(option.bottom).toBeLessThanOrEqual(list.bottom + 1);
    });
    await screen.getByRole("option", { name: /(?:demo-skill-199|Demo Skill 199)/ }).click();
    expect(props.onSelect).toHaveBeenCalledWith(props.items[199]);
    await screen.rerender(
      <ComposerCommandMenu
        {...props}
        items={props.items.slice(199)}
        activeItemId={skills[199]!.id}
      />,
    );
    await expect
      .element(screen.getByRole("option", { name: /(?:demo-skill-199|Demo Skill 199)/ }))
      .toBeVisible();
    expect(screen.container.querySelectorAll('[role="option"]').length).toBe(1);
    await screen.rerender(
      <ComposerCommandMenu {...props} items={[]} activeItemId={null} emptyStateText="No matches" />,
    );
    await expect.element(screen.getByText("No matches")).toBeVisible();
  },
);

it("reveals an initially offscreen selection and restores a filtered list", async () => {
  const props = {
    listId: "initial",
    items: skills,
    resolvedTheme: "dark" as const,
    isLoading: false,
    triggerKind: "skill" as const,
    activeItemId: "skill-199",
    onHighlightedItemChange: vi.fn(),
    onSelect: vi.fn(),
  };
  await using screen = await render(<ComposerCommandMenu {...props} />);
  await expect.element(screen.getByRole("option", { name: /demo-skill-199/ })).toBeVisible();
  await screen.rerender(
    <ComposerCommandMenu {...props} items={[]} isLoading activeItemId={null} />,
  );
  await expect.element(screen.getByText("Searching workspace skills...")).toBeVisible();
  await screen.rerender(
    <ComposerCommandMenu {...props} items={skills.slice(0, 2)} activeItemId="skill-0" />,
  );
  await expect.element(screen.getByRole("option", { name: /demo-skill-0/ })).toBeVisible();
  await screen.rerender(<ComposerCommandMenu {...props} activeItemId="skill-0" />);
  await expect.element(screen.getByRole("option", { name: /demo-skill-0/ })).toBeVisible();
  expect(screen.container.querySelectorAll('[role="option"]').length).toBeLessThan(40);
});

it("selects an offscreen result through the editor keyboard handler", async () => {
  const onSelect = vi.fn();
  let index = 0;
  const activeItem = { current: skills[index]! };
  const props = {
    listId: "keyboard",
    items: skills,
    resolvedTheme: "light" as const,
    isLoading: false,
    triggerKind: "skill" as const,
    activeItemId: activeItem.current.id,
    onHighlightedItemChange: vi.fn(),
    onSelect,
  };
  await using screen = await render(<ComposerCommandMenu {...props} />);
  const handler = composerCommandKeyHandler({
    keybindings: [],
    sendShortcut: "enter",
    routeKind: "draft",
    phase: "ready",
    isCompacting: false,
    followUpBehavior: "queue",
    isSoftwareKeyboardOpen: false,
    planModeUiEnabled: false,
    isLiteralPendingAnswer: false,
    pendingUserInputs: [],
    promptHistoryMessages: [],
    promptHistoryPositionRef: { current: null },
    composerDraftTarget: {
      environmentId: EnvironmentId.make("menu-environment"),
      threadId: ThreadId.make("menu-thread"),
    },
    promptRef: { current: "$" },
    composerImagesRef: { current: [] },
    composerFilesRef: { current: [] },
    composerTerminalContextsRef: { current: [] },
    composerPreviewAnnotations: [],
    composerReviewComments: [],
    composerEditorRef: { current: null },
    composerMenuOpenRef: { current: true },
    composerMenuItemsRef: { current: skills },
    activeComposerMenuItemRef: activeItem,
    setComposerDraftPrompt: vi.fn(),
    setComposerCursor: vi.fn(),
    setComposerTrigger: vi.fn(),
    setComposerHighlightedItemId: vi.fn(),
    dismissComposerTrigger: vi.fn(),
    toggleInteractionMode: vi.fn(),
    nudgeComposerMenuHighlight: (key) => {
      index = (index + (key === "ArrowDown" ? 1 : -1) + skills.length) % skills.length;
      activeItem.current = skills[index]!;
    },
    onSelectComposerItem: onSelect,
    resolveActiveComposerTrigger: () => ({ trigger: null }),
    readComposerSnapshot: () => ({ value: "$" }),
    applyPromptReplacement: () => false,
    submitComposer: vi.fn(),
  });
  expect(handler("ArrowUp", new KeyboardEvent("keydown", { key: "ArrowUp" }))).toBe(true);
  await screen.rerender(<ComposerCommandMenu {...props} activeItemId={activeItem.current.id} />);
  await expect.element(screen.getByRole("option", { name: /demo-skill-199/ })).toBeVisible();
  expect(handler("Enter", new KeyboardEvent("keydown", { key: "Enter" }))).toBe(true);
  expect(onSelect).toHaveBeenLastCalledWith(skills[199]);
  expect(handler("ArrowDown", new KeyboardEvent("keydown", { key: "ArrowDown" }))).toBe(true);
  await screen.rerender(<ComposerCommandMenu {...props} activeItemId={activeItem.current.id} />);
  await expect.element(screen.getByRole("option", { name: /demo-skill-0/ })).toBeVisible();
});
