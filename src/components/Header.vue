<template>
  <header class="flex px-4 justify-between border-b border-slate-200 py-8">
    <div>
      <router-link to="/" class="flex items-center gap-4">
        <img class="w-16 sm:w-16" src="/logo.png" alt="Logo" />
        <div>
          <h2 class="text-xl font-bold uppercase">КИНО</h2>
          <p class="text-slate-400">на любой вкус</p>
        </div>
      </router-link>
    </div>
    <nav>
      <ul class="gap-10 sm:flex items-center sm:mt-5">
        <li class="mb-4 sm:mb-0">
          <router-link to="favorites" class="header-nav">
            <img class="w-5" src="/favorite.svg" alt="heart" />
            <span>Избранное</span>
          </router-link>
        </li>
        <li>
          <router-link to="/login" class="header-nav">
            <img class="w-7" src="/profile.svg" alt="profile" />
            <span>Профиль</span>
          </router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>
