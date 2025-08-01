import { SortTypes } from 'utils/sorting'; // Since `SortHandler` describes a type for a sorting handler that works with specific data

// Since `SortHandler` describes a type for a sorting handler that works with specific data
// (e.g., for sorting lists or objects), it makes sense to place it in the `models` folder,
// which contains types that define the structure and functionality of data within the app.
export type SortHandler = {
	(order: SortTypes): void;
};

export interface PaginationDetails<T = number> {
	nextItem: T | null; // Null if there is no next item
	prevItem: T | null; // Null if there is no previous item
	currentItem: T; // The current active item
	totalItems: number; // Total number of items in the list
	currentPage: T; // The current page number
	itemsPerPage: number; // Number of items per page
	totalPages: number; // Total number of pages available
	hasMorePages: boolean; // Whether there are more pages to navigate to
}

export enum NavDirection {
	Next = 'next',
	Back = 'back',
}
