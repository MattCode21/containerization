// Advanced 3D Bin Packing Algorithm for Loadability Optimization
// Based on the Extreme Point Algorithm with mixed orientations support

export interface Item {
  width: number;
  height: number;
  depth: number;
  weight: number;
  id: string;
  position?: [number, number, number];
  rotation?: [number, number, number];
}

export interface Container {
  width: number;
  height: number;
  depth: number;
  maxWeight: number;
  items: Item[];
  volumeUsed: number;
  weightUsed: number;
  extremePoints: [number, number, number][];
  space: boolean[][][];
}

export class OptimizationEngine {
  private container: Container;
  private productType: 'tiles' | 'tools' | null;

  constructor(
    containerDims: [number, number, number], 
    maxWeight: number,
    productType: 'tiles' | 'tools' | null = null
  ) {
    this.productType = productType;
    this.container = {
      width: containerDims[0],
      height: containerDims[1],
      depth: containerDims[2],
      maxWeight,
      items: [],
      volumeUsed: 0,
      weightUsed: 0,
      extremePoints: [[0, 0, 0]],
      space: this.initializeSpace(containerDims)
    };
  }

  private initializeSpace([w, h, d]: [number, number, number]): boolean[][][] {
    const space: boolean[][][] = [];
    for (let x = 0; x <= w; x++) {
      space[x] = [];
      for (let y = 0; y <= h; y++) {
        space[x][y] = [];
        for (let z = 0; z <= d; z++) {
          space[x][y][z] = false;
        }
      }
    }
    return space;
  }

  private getValidOrientations(item: Item): [number, number, number][] {
    const base = [item.width, item.height, item.depth];
    
    if (this.productType === 'tiles') {
      // Tiles can only be placed vertically (height remains constant)
      return [
        [base[0], base[1], base[2]], // Original orientation
        [base[2], base[1], base[0]]  // Rotated 90° horizontally
      ];
    } else {
      // Tools and general products can have mixed orientations
      const orientations = new Set<string>();
      const perms = [
        [base[0], base[1], base[2]],
        [base[0], base[2], base[1]],
        [base[1], base[0], base[2]],
        [base[1], base[2], base[0]],
        [base[2], base[0], base[1]],
        [base[2], base[1], base[0]]
      ];
      
      perms.forEach(perm => {
        orientations.add(perm.join(','));
      });
      
      return Array.from(orientations).map(str => 
        str.split(',').map(Number) as [number, number, number]
      );
    }
  }

  private canPlace(
    item: Item, 
    position: [number, number, number], 
    rotation: [number, number, number]
  ): boolean {
    const [x, y, z] = position;
    const [w, h, d] = rotation;

    // Check bounds
    if (x + w > this.container.width || 
        y + h > this.container.height || 
        z + d > this.container.depth) {
      return false;
    }

    // Check weight constraint
    if (this.container.weightUsed + item.weight > this.container.maxWeight) {
      return false;
    }

    // Check space occupation
    for (let dx = 0; dx < w; dx++) {
      for (let dy = 0; dy < h; dy++) {
        for (let dz = 0; dz < d; dz++) {
          const px = Math.floor(x + dx);
          const py = Math.floor(y + dy);
          const pz = Math.floor(z + dz);
          
          if (px >= this.container.width || 
              py >= this.container.height || 
              pz >= this.container.depth) {
            continue;
          }
          
          if (this.container.space[px][py][pz]) {
            return false;
          }
        }
      }
    }

    return true;
  }

  private placeItem(
    item: Item, 
    position: [number, number, number], 
    rotation: [number, number, number]
  ): void {
    const [x, y, z] = position;
    const [w, h, d] = rotation;

    // Update item properties
    item.position = position;
    item.rotation = rotation;
    this.container.items.push(item);

    // Update container state
    this.container.volumeUsed += w * h * d;
    this.container.weightUsed += item.weight;

    // Mark space as occupied
    for (let dx = 0; dx < w; dx++) {
      for (let dy = 0; dy < h; dy++) {
        for (let dz = 0; dz < d; dz++) {
          const px = Math.floor(x + dx);
          const py = Math.floor(y + dy);
          const pz = Math.floor(z + dz);
          
          if (px < this.container.width && 
              py < this.container.height && 
              pz < this.container.depth) {
            this.container.space[px][py][pz] = true;
          }
        }
      }
    }

    // Update extreme points
    const newPoints: [number, number, number][] = [
      [x + w, y, z],
      [x, y + h, z],
      [x, y, z + d]
    ];

    newPoints.forEach(point => {
      if (this.isValidPoint(point) && 
          !this.container.extremePoints.some(ep => 
            ep[0] === point[0] && ep[1] === point[1] && ep[2] === point[2]
          )) {
        this.container.extremePoints.push(point);
      }
    });

    // Remove the used extreme point
    this.container.extremePoints = this.container.extremePoints.filter(ep =>
      !(ep[0] === x && ep[1] === y && ep[2] === z)
    );
  }

  private isValidPoint([x, y, z]: [number, number, number]): boolean {
    return x >= 0 && x <= this.container.width &&
           y >= 0 && y <= this.container.height &&
           z >= 0 && z <= this.container.depth;
  }

  public optimizePacking(items: Item[]): {
    placedItems: Item[];
    totalItems: number;
    spaceUtilization: number;
    weightUtilization: number;
    efficiency: number;
  } {
    // Sort items by volume (largest first) for better packing
    const sortedItems = [...items].sort((a, b) => 
      (b.width * b.height * b.depth) - (a.width * a.height * a.depth)
    );

    for (const item of sortedItems) {
      let bestFitness = Infinity;
      let bestPosition: [number, number, number] | null = null;
      let bestRotation: [number, number, number] | null = null;

      const orientations = this.getValidOrientations(item);

      // Try each extreme point
      for (const point of this.container.extremePoints) {
        // Try each valid orientation
        for (const rotation of orientations) {
          if (this.canPlace(item, point, rotation)) {
            // Calculate fitness (prefer bottom-left-front placement)
            const fitness = point[0] + point[1] + point[2];
            
            if (fitness < bestFitness) {
              bestFitness = fitness;
              bestPosition = point;
              bestRotation = rotation;
            }
          }
        }
      }

      // Place item if valid position found
      if (bestPosition && bestRotation) {
        this.placeItem(item, bestPosition, bestRotation);
      }
    }

    const containerVolume = this.container.width * this.container.height * this.container.depth;
    const spaceUtilization = (this.container.volumeUsed / containerVolume) * 100;
    const weightUtilization = (this.container.weightUsed / this.container.maxWeight) * 100;
    const efficiency = (spaceUtilization + weightUtilization) / 2;

    return {
      placedItems: this.container.items,
      totalItems: this.container.items.length,
      spaceUtilization: Math.round(spaceUtilization * 100) / 100,
      weightUtilization: Math.round(weightUtilization * 100) / 100,
      efficiency: Math.round(efficiency * 100) / 100
    };
  }

  public getContainer(): Container {
    return this.container;
  }
}

// Unit conversion utilities
export const convertUnits = {
  toMM: (value: number, from: 'cm' | 'inch' | 'mm'): number => {
    switch (from) {
      case 'cm': return value * 10;
      case 'inch': return value * 25.4;
      case 'mm': return value;
      default: return value;
    }
  },
  
  fromMM: (value: number, to: 'cm' | 'inch' | 'mm'): number => {
    switch (to) {
      case 'cm': return value / 10;
      case 'inch': return value / 25.4;
      case 'mm': return value;
      default: return value;
    }
  }
};

// Standard container dimensions (in mm)
export const STANDARD_CONTAINERS = {
  '20ft': {
    length: 5898,
    width: 2352,
    height: 2393,
    maxWeight: 28230,
    unit: 'mm'
  },
  '40ft': {
    length: 12032,
    width: 2352,
    height: 2393,
    maxWeight: 28790,
    unit: 'mm'
  }
} as const;