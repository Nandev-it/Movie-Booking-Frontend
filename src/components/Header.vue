```vue
<script setup>
import { ref, watch, onMounted, onUnmounted, nextTick } from 'vue'

import {
    Menu,
    X,
    Search,
    Bell,
    Settings,
    User,
    Home,
    Film,
    Building2,
    Ticket,
    Gift,
    Loader2
} from 'lucide-vue-next'

import api from '../services/api'
import logoImg from '../assets/icons/cineverse-legend.png'

// =====================================================
// SIDEBAR
// =====================================================

const sidebarOpen = ref(false)

const toggleSidebar = () => {
    sidebarOpen.value = !sidebarOpen.value

    // Close search when sidebar opens
    if (sidebarOpen.value) {
        searchOpen.value = false
        clearSearch()
    }
}

const closeSidebar = () => {
    sidebarOpen.value = false
}


// =====================================================
// SEARCH
// =====================================================

const searchOpen = ref(false)
const searchQuery = ref('')
const searchResults = ref([])
const searchLoading = ref(false)
const searchFinished = ref(false)

const searchInput = ref(null)

let searchTimeout = null


// Open / close search
const toggleSearch = async () => {
    searchOpen.value = !searchOpen.value

    // Close sidebar when search opens
    if (searchOpen.value) {
        sidebarOpen.value = false

        await nextTick()

        searchInput.value?.focus()
    } else {
        clearSearch()
    }
}


// Clear search
const clearSearch = () => {
    searchQuery.value = ''
    searchResults.value = []
    searchLoading.value = false
    searchFinished.value = false

    if (searchTimeout) {
        clearTimeout(searchTimeout)
        searchTimeout = null
    }
}


// Search movies from Laravel API
const searchMovies = async (query) => {

    const keyword = query.trim()

    // Empty search
    if (!keyword) {
        searchResults.value = []
        searchFinished.value = false
        searchLoading.value = false
        return
    }

    try {

        searchLoading.value = true
        searchFinished.value = false

        const response = await api.get('/movies/search', {
            params: {
                q: keyword
            }
        })

        // Supports both:
        // response.data = [...]
        // response.data = { data: [...] }

        searchResults.value =
            response.data?.data ?? response.data ?? []

        searchFinished.value = true

    } catch (error) {

        console.error('Movie search error:', error)

        searchResults.value = []
        searchFinished.value = true

    } finally {

        searchLoading.value = false

    }
}


// Debounce search
watch(searchQuery, (newValue) => {

    if (searchTimeout) {
        clearTimeout(searchTimeout)
    }

    const keyword = newValue.trim()

    if (!keyword) {

        searchResults.value = []
        searchFinished.value = false
        searchLoading.value = false

        return
    }

    // Show loading while waiting
    searchLoading.value = true

    searchTimeout = setTimeout(() => {

        searchMovies(keyword)

    }, 300)
})


// =====================================================
// MOVIE CLICK
// =====================================================

const openMovie = (movie) => {

    console.log('Selected movie:', movie)

    // If you use Vue Router:
    // router.push(`/movies/${movie.id}`)

    searchOpen.value = false
    clearSearch()
}


// =====================================================
// CLOSE SEARCH
// =====================================================

const handleEscape = (event) => {

    if (event.key === 'Escape') {

        searchOpen.value = false
        clearSearch()

    }
}


const handleClickOutside = (event) => {

    const searchContainer =
        document.querySelector('.search-container')

    if (
        searchContainer &&
        !searchContainer.contains(event.target)
    ) {

        searchOpen.value = false
        clearSearch()

    }
}


// =====================================================
// KEYBOARD / EVENTS
// =====================================================

onMounted(() => {

    document.addEventListener(
        'keydown',
        handleEscape
    )

    document.addEventListener(
        'click',
        handleClickOutside
    )

})


onUnmounted(() => {

    document.removeEventListener(
        'keydown',
        handleEscape
    )

    document.removeEventListener(
        'click',
        handleClickOutside
    )

    if (searchTimeout) {
        clearTimeout(searchTimeout)
    }

})


// =====================================================
// NAVIGATION
// =====================================================

const navLinks = [
    {
        name: 'Home',
        href: '/',
        icon: Home
    },
    {
        name: 'Movies',
        href: '/movies',
        icon: Film
    },
    {
        name: 'Cinemas',
        href: '/cinemas',
        icon: Building2
    },
    {
        name: 'Bookings',
        href: '/bookings',
        icon: Ticket
    },
    {
        name: 'Offers',
        href: '/offers',
        icon: Gift
    }
]

</script>


<template>

    <!-- =================================================
         NAVBAR
    ================================================== -->

    <nav
        class="fixed top-0 left-0 z-50 w-full
               border-b border-white/10
               bg-gray-950/80
               backdrop-blur-xl"
    >

        <!-- NAVBAR CONTAINER -->
        <div
            class="mx-auto flex h-16
                   max-w-7xl items-center
                   px-4 sm:px-6 lg:px-8"
        >


            <!-- ==========================================
                 MOBILE MENU BUTTON
            =========================================== -->

            <button
                @click.stop="toggleSidebar"
                class="mr-3 rounded-xl p-2
                       text-gray-300
                       transition-all duration-300
                       hover:bg-white/10
                       hover:text-white
                       md:hidden cursor-pointer"
            >

                <Menu
                    v-if="!sidebarOpen"
                    class="h-6 w-6"
                />

                <X
                    v-else
                    class="h-6 w-6"
                />

            </button>


            <!-- ==========================================
                 LOGO
            =========================================== -->

            <a
                href="/"
                class="flex items-center gap-2"
            >

                <img
                    :src="logoImg"
                    alt="Cineverse Logo"
                    class="h-9 w-full object-cover"
                />

            </a>


            <!-- ==========================================
                 DESKTOP NAVIGATION
            =========================================== -->

            <div
                class="ml-10 hidden items-center
                       gap-7 md:flex"
            >

                <a
                    v-for="link in navLinks"
                    :key="link.name"
                    :href="link.href"
                    class="nav-link"
                >
                    {{ link.name }}
                </a>

            </div>


            <!-- ==========================================
                 RIGHT SIDE
            =========================================== -->

            <div
                class="ml-auto flex items-center gap-2"
            >


                <!-- ======================================
                     DESKTOP SEARCH
                ======================================= -->

                <div
                    class="search-container relative hidden md:block"
                >

                    <!-- Search Button -->

                    <button
                        @click.stop="toggleSearch"
                        class="rounded-xl p-2.5
                               text-gray-300
                               transition-all duration-300
                               hover:bg-white/10
                               hover:text-white"
                    >

                        <Search class="h-5 w-5" />

                    </button>


                    <!-- Desktop Search Panel -->

                    <Transition name="search">

                        <div
                            v-if="searchOpen"
                            @click.stop
                            class="absolute right-0 top-12
                                   w-[380px]
                                   overflow-hidden
                                   rounded-2xl
                                   border border-white/10
                                   bg-gray-950/95
                                   shadow-2xl
                                   shadow-black/40
                                   backdrop-blur-2xl"
                        >

                            <!-- Search Input -->

                            <div
                                class="flex items-center
                                       border-b border-white/10
                                       px-4 py-3"
                            >

                                <Search
                                    class="h-5 w-5
                                           flex-shrink-0
                                           text-purple-400"
                                />

                                <input
                                    ref="searchInput"
                                    v-model="searchQuery"
                                    type="text"
                                    placeholder="Search movies..."
                                    class="ml-3 w-full
                                           bg-transparent
                                           text-sm text-white
                                           outline-none
                                           placeholder:text-gray-500"
                                />


                                <!-- Loading -->

                                <Loader2
                                    v-if="searchLoading"
                                    class="ml-2 h-5 w-5
                                           flex-shrink-0
                                           animate-spin
                                           text-purple-400"
                                />


                                <!-- Clear -->

                                <button
                                    v-else-if="searchQuery"
                                    @click="clearSearch"
                                    class="ml-2 rounded-lg
                                           p-1.5
                                           text-gray-400
                                           transition
                                           hover:bg-white/10
                                           hover:text-white"
                                >

                                    <X class="h-4 w-4" />

                                </button>

                            </div>


                            <!-- Search Content -->

                            <div
                                class="max-h-[430px]
                                       overflow-y-auto"
                            >

                                <!-- Initial -->

                                <div
                                    v-if="
                                        !searchQuery.trim() &&
                                        !searchLoading
                                    "
                                    class="px-5 py-8
                                           text-center"
                                >

                                    <Search
                                        class="mx-auto mb-3
                                               h-8 w-8
                                               text-gray-600"
                                    />

                                    <p
                                        class="text-sm
                                               text-gray-500"
                                    >
                                        Search for your favorite movies
                                    </p>

                                </div>


                                <!-- Loading -->

                                <div
                                    v-else-if="searchLoading"
                                    class="px-5 py-8
                                           text-center"
                                >

                                    <Loader2
                                        class="mx-auto mb-3
                                               h-7 w-7
                                               animate-spin
                                               text-purple-400"
                                    />

                                    <p
                                        class="text-sm
                                               text-gray-500"
                                    >
                                        Searching movies...
                                    </p>

                                </div>


                                <!-- Results -->

                                <div
                                    v-else-if="
                                        searchResults.length > 0
                                    "
                                    class="p-2"
                                >

                                    <button
                                        v-for="movie in searchResults"
                                        :key="movie.id"
                                        @click="openMovie(movie)"
                                        class="flex w-full
                                               items-center gap-3
                                               rounded-xl
                                               p-2
                                               text-left
                                               transition-all
                                               duration-300
                                               hover:bg-white/10"
                                    >

                                        <!-- Poster -->

                                        <div
                                            class="h-16 w-11
                                                   flex-shrink-0
                                                   overflow-hidden
                                                   rounded-lg
                                                   bg-gray-800"
                                        >

                                            <img
                                                v-if="movie.poster"
                                                :src="movie.poster"
                                                :alt="movie.title"
                                                class="h-full w-full
                                                       object-cover"
                                            />

                                            <div
                                                v-else
                                                class="flex h-full
                                                       items-center
                                                       justify-center"
                                            >

                                                <Film
                                                    class="h-5 w-5
                                                           text-gray-600"
                                                />

                                            </div>

                                        </div>


                                        <!-- Movie Info -->

                                        <div
                                            class="min-w-0 flex-1"
                                        >

                                            <h3
                                                class="truncate
                                                       text-sm
                                                       font-semibold
                                                       text-white"
                                            >
                                                {{ movie.title }}
                                            </h3>


                                            <p
                                                class="mt-1
                                                       text-xs
                                                       text-gray-500"
                                            >

                                                {{
                                                    movie.release_date
                                                        ? new Date(
                                                            movie.release_date
                                                        ).getFullYear()
                                                        : 'N/A'
                                                }}

                                                <span class="mx-1">
                                                    •
                                                </span>

                                                {{ movie.genre || 'Movie' }}

                                            </p>

                                        </div>

                                    </button>

                                </div>


                                <!-- No Results -->

                                <div
                                    v-else-if="
                                        searchFinished &&
                                        searchQuery.trim()
                                    "
                                    class="px-5 py-8
                                           text-center"
                                >

                                    <img
                                        src="../assets/icons/notfound.png"
                                        alt="No movies found"
                                        class="mx-auto mb-3 h-14 w-14 object-contain"
                                    />

                                    <p
                                        class="text-sm
                                               font-medium
                                               text-gray-400"
                                    >
                                        No movies found
                                    </p>

                                    <p
                                        class="mt-1 text-xs
                                               text-gray-600"
                                    >
                                        Try another movie title
                                    </p>

                                </div>

                            </div>

                        </div>

                    </Transition>

                </div>


                <!-- ======================================
                     MOBILE SEARCH BUTTON
                ======================================= -->

                <button
                    @click.stop="toggleSearch"
                    class="rounded-xl p-2.5
                           text-gray-300
                           transition-all duration-300
                           hover:bg-white/10
                           hover:text-white
                           md:hidden"
                >

                    <Search class="h-5 w-5" />

                </button>


                <!-- ======================================
                     NOTIFICATION
                ======================================= -->

                <button
                    class="hidden rounded-xl p-2.5
                           text-gray-300
                           transition-all duration-300
                           hover:bg-white/10
                           hover:text-white
                           sm:block"
                >

                    <Bell class="h-5 w-5" />

                </button>


                <!-- ======================================
                     SETTINGS
                ======================================= -->

                <button
                    class="hidden rounded-xl p-2.5
                           text-gray-300
                           transition-all duration-300
                           hover:bg-white/10
                           hover:text-white
                           sm:block"
                >

                    <Settings class="h-5 w-5" />

                </button>


                <!-- ======================================
                     SIGN IN
                ======================================= -->

                <a
                    href="/login"
                    class="hidden items-center gap-2
                           rounded-xl
                           bg-purple-600
                           px-4 py-2
                           text-sm font-semibold
                           text-white
                           shadow-lg
                           shadow-purple-500/20
                           transition-all duration-300
                           hover:bg-purple-700
                           hover:shadow-purple-500/30
                           sm:flex"
                >

                    <User class="h-4 w-4" />

                    <span>
                        Sign In
                    </span>

                </a>

            </div>

        </div>


        <!-- ==============================================
             MOBILE SEARCH PANEL
        =============================================== -->

        <Transition name="mobile-search">

            <div
                v-if="searchOpen"
                class="search-container
                       border-t border-white/10
                       bg-gray-950/95
                       px-4 py-3
                       backdrop-blur-xl
                       md:hidden"
                @click.stop
            >

                <!-- Search Input -->

                <div
                    class="flex items-center
                           rounded-xl
                           border border-white/10
                           bg-white/5
                           px-3 py-2.5
                           transition-all duration-300
                           focus-within:border-purple-500/50
                           focus-within:bg-white/10"
                >

                    <Search
                        class="h-5 w-5
                               flex-shrink-0
                               text-purple-400"
                    />

                    <input
                        ref="searchInput"
                        v-model="searchQuery"
                        type="text"
                        placeholder="Search movies..."
                        class="ml-3 w-full
                               bg-transparent
                               text-sm text-white
                               outline-none
                               placeholder:text-gray-500"
                    />


                    <!-- Loading -->

                    <Loader2
                        v-if="searchLoading"
                        class="ml-2 h-5 w-5
                               flex-shrink-0
                               animate-spin
                               text-purple-400"
                    />


                    <!-- Clear -->

                    <button
                        v-else-if="searchQuery"
                        @click="clearSearch"
                        class="ml-2 rounded-lg
                               p-1.5
                               text-gray-400
                               transition
                               hover:bg-white/10
                               hover:text-white"
                    >

                        <X class="h-4 w-4" />

                    </button>

                </div>


                <!-- Mobile Results -->

                <div
                    class="mt-3 max-h-[60vh]
                           overflow-y-auto"
                >

                    <!-- Initial -->

                    <div
                        v-if="
                            !searchQuery.trim() &&
                            !searchLoading
                        "
                        class="py-8 text-center"
                    >

                        <Search
                            class="mx-auto mb-3
                                   h-8 w-8
                                   text-gray-600"
                        />

                        <p
                            class="text-sm
                                   text-gray-500"
                        >
                            Search for your favorite movies
                        </p>

                    </div>


                    <!-- Loading -->

                    <div
                        v-else-if="searchLoading"
                        class="py-8 text-center"
                    >

                        <Loader2
                            class="mx-auto mb-3
                                   h-7 w-7
                                   animate-spin
                                   text-purple-400"
                        />

                        <p
                            class="text-sm
                                   text-gray-500"
                        >
                            Searching movies...
                        </p>

                    </div>


                    <!-- Results -->

                    <div
                        v-else-if="
                            searchResults.length > 0
                        "
                        class="space-y-1"
                    >

                        <button
                            v-for="movie in searchResults"
                            :key="movie.id"
                            @click="openMovie(movie)"
                            class="flex w-full
                                   items-center gap-3
                                   rounded-xl
                                   p-2
                                   text-left
                                   transition-all duration-300
                                   hover:bg-white/10"
                        >

                            <!-- Poster -->

                            <div
                                class="h-16 w-11
                                       flex-shrink-0
                                       overflow-hidden
                                       rounded-lg
                                       bg-gray-800"
                            >

                                <img
                                    v-if="movie.poster"
                                    :src="movie.poster"
                                    :alt="movie.title"
                                    class="h-full w-full
                                           object-cover"
                                />

                                <div
                                    v-else
                                    class="flex h-full
                                           items-center
                                           justify-center"
                                >

                                    <Film
                                        class="h-5 w-5
                                               text-gray-600"
                                    />

                                </div>

                            </div>


                            <!-- Movie Information -->

                            <div
                                class="min-w-0 flex-1"
                            >

                                <h3
                                    class="truncate
                                           text-sm
                                           font-semibold
                                           text-white"
                                >
                                    {{ movie.title }}
                                </h3>


                                <p
                                    class="mt-1
                                           text-xs
                                           text-gray-500"
                                >

                                    {{
                                        movie.release_date
                                            ? new Date(
                                                movie.release_date
                                            ).getFullYear()
                                            : 'N/A'
                                    }}

                                    <span class="mx-1">
                                        •
                                    </span>

                                    {{ movie.genre || 'Movie' }}

                                </p>

                            </div>

                        </button>

                    </div>


                    <!-- No Results -->

                    <div
                        v-else-if="
                            searchFinished &&
                            searchQuery.trim()
                        "
                        class="py-8 text-center"
                    >

                        <Film
                            class="mx-auto mb-3
                                   h-8 w-8
                                   text-gray-600"
                        />

                        <p
                            class="text-sm
                                   font-medium
                                   text-gray-400"
                        >
                            No movies found
                        </p>

                        <p
                            class="mt-1 text-xs
                                   text-gray-600"
                        >
                            Try another movie title
                        </p>

                    </div>

                </div>

            </div>

        </Transition>

    </nav>


    <!-- =================================================
         MOBILE SIDEBAR OVERLAY
    ================================================== -->

    <Transition name="fade">

        <div
            v-if="sidebarOpen"
            @click="closeSidebar"
            class="fixed inset-0 z-40
                   bg-black/60
                   backdrop-blur-sm
                   md:hidden"
        ></div>

    </Transition>


    <!-- =================================================
         MOBILE SIDEBAR
    ================================================== -->

    <Transition name="sidebar">

        <aside
            v-if="sidebarOpen"
            class="fixed top-0 left-0 z-50
                   h-full w-72
                   border-r border-white/10
                   bg-gray-950
                   shadow-2xl
                   md:hidden hover:cursor-pointer"
        >

            <!-- Sidebar Header -->

            <div
                class="flex h-16
                       items-center
                       justify-between
                       border-b border-white/10
                       px-5"
            >

                <div
                    class="flex items-center gap-2"
                >

                    <img
                        :src="logoImg"
                        alt="Cineverse Logo"
                        class="h-9 w-full object-cover"
                    />

                </div>


                <!-- Close -->

                <button
                    @click="closeSidebar"
                    class="rounded-xl p-2
                           text-gray-400
                           transition
                           hover:bg-white/10
                           hover:text-white hover:cursor-pointer"
                >

                    <X class="h-5 w-5" />

                </button>

            </div>


            <!-- Sidebar Menu -->

            <div class="p-4">

                <p
                    class="mb-3 px-3
                           text-xs font-semibold
                           uppercase tracking-wider
                           text-gray-600"
                >
                    Menu
                </p>


                <div class="space-y-1">

                    <a
                        v-for="link in navLinks"
                        :key="link.name"
                        :href="link.href"
                        @click="closeSidebar"
                        class="mobile-link"
                    >

                        <component
                            :is="link.icon"
                            class="h-5 w-5"
                        />

                        <span>
                            {{ link.name }}
                        </span>

                    </a>

                </div>

            </div>


            <!-- Sidebar Bottom -->

            <div
                class="absolute bottom-0
                       left-0 right-0
                       border-t border-white/10
                       p-4"
            >

                <a
                    href="/login"
                    class="flex w-full
                           items-center
                           justify-center gap-2
                           rounded-xl
                           bg-purple-600
                           px-4 py-3
                           text-sm font-semibold
                           text-white
                           transition-all duration-300
                           hover:bg-purple-700"
                >

                    <User class="h-4 w-4" />

                    Sign In

                </a>

            </div>

        </aside>

    </Transition>

</template>


<style scoped>

/* =====================================================
   DESKTOP NAV LINKS
===================================================== */

.nav-link {
    position: relative;

    font-size: 0.875rem;
    font-weight: 500;

    color: rgb(156 163 175);

    transition:
        color 0.3s ease,
        transform 0.3s ease;
}


.nav-link:hover {
    color: rgb(192 132 252);

    transform: translateY(-2px);
}


.nav-link.active {
    color: white;
}


/* Underline */

.nav-link::after {
    content: '';

    position: absolute;

    left: 0;
    bottom: -7px;

    width: 0;
    height: 2px;

    border-radius: 999px;

    background: rgb(168 85 247);

    transition: width 0.3s ease;
}


.nav-link:hover::after,
.nav-link.active::after {
    width: 100%;
}


/* =====================================================
   MOBILE LINKS
===================================================== */

.mobile-link {
    display: flex;

    align-items: center;

    gap: 1rem;

    width: 100%;

    padding: 0.75rem 1rem;

    border-radius: 0.75rem;

    color: rgb(209 213 219);

    transition:
        background 0.3s ease,
        color 0.3s ease,
        transform 0.3s ease;
}


.mobile-link:hover {
    background: rgba(255, 255, 255, 0.08);

    color: white;

    transform: translateX(5px);
}


.mobile-link.active {
    background: rgb(147 51 234);

    color: white;
}


/* =====================================================
   SIDEBAR ANIMATION
===================================================== */

.sidebar-enter-active,
.sidebar-leave-active {
    transition:
        transform 0.35s ease,
        opacity 0.35s ease;
}


.sidebar-enter-from,
.sidebar-leave-to {
    transform: translateX(-100%);

    opacity: 0;
}


/* =====================================================
   OVERLAY ANIMATION
===================================================== */

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}


.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}


/* =====================================================
   DESKTOP SEARCH ANIMATION
===================================================== */

.search-enter-active,
.search-leave-active {
    transition:
        opacity 0.3s ease,
        transform 0.3s ease;
}


.search-enter-from,
.search-leave-to {
    opacity: 0;

    transform:
        translateY(-10px)
        scale(0.96);
}


/* =====================================================
   MOBILE SEARCH ANIMATION
===================================================== */

.mobile-search-enter-active,
.mobile-search-leave-active {
    transition:
        opacity 0.3s ease,
        transform 0.3s ease;
}


.mobile-search-enter-from,
.mobile-search-leave-to {
    opacity: 0;

    transform: translateY(-10px);
}


/* =====================================================
   SCROLLBAR
===================================================== */

div::-webkit-scrollbar {
    width: 5px;
}


div::-webkit-scrollbar-track {
    background: transparent;
}


div::-webkit-scrollbar-thumb {
    background: rgba(168, 85, 247, 0.4);

    border-radius: 999px;
}


div::-webkit-scrollbar-thumb:hover {
    background: rgba(168, 85, 247, 0.7);
}

</style>
