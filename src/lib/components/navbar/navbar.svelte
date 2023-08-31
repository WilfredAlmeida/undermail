<script lang="ts">
  import * as Avatar from "$lib/components/ui/avatar";
</script>

<nav class="bg-white border-gray-200 dark:bg-gray-900">
    <div class="max-w-screen-xl flex flex-wrap justify-between mx-auto p-4">
    <a href="/" class="flex items-center">
        <img src="https://flowbite.com/docs/images/logo.svg" class="h-8 mr-3" alt="Flowbite Logo" />
        <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">NftChimp</span>
    </a>

    <Avatar.Root>
      <Avatar.Image src="https://github.com/shadcn.png" alt="user" />
      <Avatar.Fallback>CN</Avatar.Fallback>
    </Avatar.Root>

    </div>
  </nav>
  