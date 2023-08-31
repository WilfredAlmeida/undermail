<script>
    
    // Sample data for user projects
    const userProjects = [
      { id: 1, title: "Project 1", description: "Description of Project 1" },
      { id: 2, title: "Project 2", description: "Description of Project 2" },
      { id: 3, title: "Project 3", description: "Description of Project 3" }
    ];
  
    // Function to create a new project
    const createProject = () => {
      // Add your create project logic here
    };
  </script>
  
  <main class="p-8">
    <!-- Heading -->
    <h1 class="text-3xl font-semibold mb-6 text-white">Projects</h1>
    
    <!-- Create Project Button (Top Right) -->
    <button
      class="absolute top-4 right-4 bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600"
      on:click={createProject}
    >
      Create Project
    </button>
    
    <!-- List of user projects -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each userProjects as project (project.id)}

      <a href="#" class="block max-w-sm p-6 h-40 bg-white border border-green-400 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{project.title}</h5>
        <p class="font-normal text-gray-700 dark:text-gray-400">{project.description}</p>
    </a>
    
      {/each}
    </div>
  </main>
  