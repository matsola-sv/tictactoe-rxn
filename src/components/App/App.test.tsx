import { render, screen } from '@testing-library/react';
import App from 'components/App/App';
import { MediaQueryProps } from 'components/Providers/MediaQueryProvider/MediaQueryProvider';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { store } from 'store';

// Mock the MediaQueryProvider to avoid issues with useMedia hook in tests
jest.mock('components/Providers/MediaQueryProvider/MediaQueryProvider', () => {
	return function MockMediaQueryProvider({ children }: MediaQueryProps) {
		return <div data-testid='media-query-provider'>{children}</div>;
	};
});

// Mock the AppRouter to simplify testing
jest.mock('routers/AppRouter', () => {
	return function MockAppRouter() {
		return <div data-testid='app-router'>App Router Content</div>;
	};
});

describe('App Component', () => {
	const renderApp = () => {
		return render(
			<Provider store={store}>
				<MemoryRouter>
					<App />
				</MemoryRouter>
			</Provider>,
		);
	};

	const getAppRouter = () => screen.getByTestId('app-router');
	const getAppElement = () => document.querySelector('.App') as HTMLElement;
	const getMediaQueryProvider = () => screen.getByTestId('media-query-provider');

	// Check that AppRouter is a child of AppElement
	const expectAppHierarchy = () => {
		const appElement = getAppElement();
		const appRouter = getAppRouter();

		expect(appElement).toContainElement(appRouter);
	};

	test('renders without crashing', () => {
		renderApp();
		expect(getMediaQueryProvider()).toBeInTheDocument();
	});

	test('renders with correct structure', () => {
		renderApp();

		// Check that the main App container is rendered
		const appContainer = getAppElement();
		expect(appContainer).toBeInTheDocument();

		// Check that MediaQueryProvider, AppRouter are rendered
		expect(getMediaQueryProvider()).toBeInTheDocument();
		expect(getAppRouter()).toBeInTheDocument();
	});

	test('has correct CSS class', () => {
		renderApp();

		const appElement = getAppElement();
		expect(appElement).toBeInTheDocument();
		expect(appElement).toHaveClass('App');
	});

	test('wraps AppRouter with App', () => {
		renderApp();
		expectAppHierarchy();
	});

	test('renders AppRouter content', () => {
		renderApp();
		expect(screen.getByText('App Router Content')).toBeInTheDocument();
	});

	test('maintains proper component hierarchy', () => {
		renderApp();

		// Verify the component hierarchy: MediaQueryProvider > App > AppRouter
		const appElement = getAppElement();
		const mediaQueryProvider = getMediaQueryProvider();

		expect(mediaQueryProvider).toContainElement(appElement);
		expectAppHierarchy();
	});
});
