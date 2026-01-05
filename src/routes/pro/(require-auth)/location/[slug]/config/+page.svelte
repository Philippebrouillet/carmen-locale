<script>
  import { Label, Switch } from "bits-ui";

  export let data;

  const location = data.locationInfo.location;
</script>

<main>
  <pre>
        {JSON.stringify(location, null, 2)}
    </pre>

  <div class="flex flex-col w-full bg-slate-300">
    <div class="flex items-center space-x-3">
      <Label.Root for="hide-fee" class="text-sm font-medium">Hide fee</Label.Root>
      <Switch.Root
        id="hide-fee"
        class="peer inline-flex h-[36px] min-h-[36px] w-[60px] shrink-0 cursor-pointer items-center rounded-full px-[3px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-foreground data-[state=unchecked]:bg-dark-10 data-[state=unchecked]:shadow-mini-inset dark:data-[state=checked]:bg-foreground"
      >
        <Switch.Thumb
          class="pointer-events-none block size-[30px] shrink-0 rounded-full bg-background transition-transform data-[state=checked]:translate-x-6 data-[state=unchecked]:translate-x-0 data-[state=unchecked]:shadow-mini dark:border dark:border-background/30 dark:bg-foreground dark:shadow-popover dark:data-[state=unchecked]:border"
        />
      </Switch.Root>
    </div>

    <div class="flex items-center space-x-3">
      <Label.Root for="carden" class="text-sm font-medium">Hide fee</Label.Root>
      <Switch.Root
        id="carden"
        class="peer inline-flex h-[36px] min-h-[36px] w-[60px] shrink-0 cursor-pointer items-center rounded-full px-[3px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-foreground data-[state=unchecked]:bg-dark-10 data-[state=unchecked]:shadow-mini-inset dark:data-[state=checked]:bg-foreground"
      >
        <Switch.Thumb
          class="pointer-events-none block size-[30px] shrink-0 rounded-full bg-background transition-transform data-[state=checked]:translate-x-6 data-[state=unchecked]:translate-x-0 data-[state=unchecked]:shadow-mini dark:border dark:border-background/30 dark:bg-foreground dark:shadow-popover dark:data-[state=unchecked]:border"
        />
      </Switch.Root>
    </div>

    <div class="flex items-center space-x-3">
      <Label.Root
        id="loaction-fee-label"
        for="location-fee"
        class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Location fee
      </Label.Root>
      <input id="location-fee" type="number" />
    </div>
  </div>
</main>
