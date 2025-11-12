import java.util.*;

public class Graphimpl {
    private int vertices;
    private List<List<Integer>> adjList;

    // Constructor
    public Graphimpl(int vertices) {
        this.vertices = vertices;
        adjList = new ArrayList<>();
        for (int i = 0; i < vertices; i++) {
            adjList.add(new ArrayList<>());
        }
    }

    // Add edge (directed)
    public void addEdge(int src, int dest) {
        adjList.get(src).add(dest);
    }

    // Remove edge
    public void removeEdge(int src, int dest) {
        adjList.get(src).remove(Integer.valueOf(dest));
    }

    // Check if edge exists
    public boolean hasEdge(int src, int dest) {
        return adjList.get(src).contains(dest);
    }

    // Get neighbors
    public List<Integer> getNeighbors(int node) {
        return adjList.get(node);
    }

    // Print graph
    public void printGraph() {
        System.out.println("\nAdjacency List Representation:");
        for (int i = 0; i < vertices; i++) {
            System.out.print(i + " -> ");
            for (int neighbor : adjList.get(i)) {
                System.out.print(neighbor + " ");
            }
            System.out.println();
        }
    }

    // Depth-First Search
    public void dfs(int start, boolean[] visited) {
        visited[start] = true;
        System.out.print(start + " ");
        for (int neighbor : adjList.get(start)) {
            if (!visited[neighbor]) {
                dfs(neighbor, visited);
            }
        }
    }

    // Breadth-First Search
    public void bfs(int start) {
        boolean[] visited = new boolean[vertices];
        Queue<Integer> queue = new LinkedList<>();
        visited[start] = true;
        queue.add(start);

        while (!queue.isEmpty()) {
            int node = queue.poll();
            System.out.print(node + " ");
            for (int neighbor : adjList.get(node)) {
                if (!visited[neighbor]) {
                    visited[neighbor] = true;
                    queue.add(neighbor);
                }
            }
        }
    }

    // Main method for testing (No Scanner)
    public static void main(String[] args) {
        int v = 5; // number of vertices
        Graphimpl graph = new Graphimpl(v);

        // Define edges manually
        int[][] edges = {
            {0, 1},
            {0, 2},
            {1, 3},
            {1, 4},
            {2, 4},
            {3, 0}
        };

        // Add edges to graph
        for (int[] edge : edges) {
            graph.addEdge(edge[0], edge[1]);
        }

        // Display graph
        graph.printGraph();

        // Perform DFS and BFS
        System.out.print("\nDFS from node 0: ");
        boolean[] visitedDFS = new boolean[v];
        graph.dfs(0, visitedDFS);

        System.out.print("\nBFS from node 0: ");
        graph.bfs(0);
    }
}
