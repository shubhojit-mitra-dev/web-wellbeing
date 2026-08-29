import { Suspense, lazy, useEffect } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { StatCardSkeleton } from '@web-wellbeing/ui';
import { DashboardLayout } from '../../components/dashboard/DashboardLayout';
import { DashboardErrorBoundary } from '../../components/dashboard/DashboardErrorBoundary';

const OverviewView = lazy(() => import('../../views/OverviewView'));
const AnalyticsView = lazy(() => import('../../views/AnalyticsView'));
const FocusView = lazy(() => import('../../views/FocusView'));
const GoalsView = lazy(() => import('../../views/GoalsView'));
const SettingsView = lazy(() => import('../../views/SettingsView'));

function SuspenseFallback() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 w-full">
      <StatCardSkeleton />
      <StatCardSkeleton />
      <StatCardSkeleton />
      <StatCardSkeleton />
    </div>
  );
}

/**
 * Listen for SYNC_TRIGGER messages from the background service worker alarm.
 * The SW cannot import @supabase/supabase-js (no DOM), so it delegates sync to
 * the newtab page which runs in a full browser context.
 */
function useSyncTriggerListener() {
  useEffect(() => {
    if (typeof chrome === 'undefined' || !chrome.runtime?.onMessage) return;

    const handleMessage = (message: { type?: string }) => {
      if (message?.type === 'SYNC_TRIGGER') {
        console.log('[App] Sync trigger received — flushing offline queue');
        import('@web-wellbeing/supabase').then(({ SupabaseActivityRepository }) =>
          import('../../sync/background-sync-coordinator').then(({ BackgroundSyncCoordinator }) => {
            const coordinator = new BackgroundSyncCoordinator();
            const repository = new SupabaseActivityRepository();
            coordinator.flushQueue(repository).catch((err: unknown) => {
              console.error('[App] Sync flush failed:', err);
            });
          }),
        );
      }
    };

    chrome.runtime.onMessage.addListener(handleMessage);
    return () => {
      chrome.runtime.onMessage.removeListener(handleMessage);
    };
  }, []);
}

export function App() {
  useSyncTriggerListener();

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route
            index
            element={
              <DashboardErrorBoundary>
                <Suspense fallback={<SuspenseFallback />}>
                  <OverviewView />
                </Suspense>
              </DashboardErrorBoundary>
            }
          />
          <Route
            path="analytics"
            element={
              <DashboardErrorBoundary>
                <Suspense fallback={<SuspenseFallback />}>
                  <AnalyticsView />
                </Suspense>
              </DashboardErrorBoundary>
            }
          />
          <Route
            path="focus"
            element={
              <DashboardErrorBoundary>
                <Suspense fallback={<SuspenseFallback />}>
                  <FocusView />
                </Suspense>
              </DashboardErrorBoundary>
            }
          />
          <Route
            path="goals"
            element={
              <DashboardErrorBoundary>
                <Suspense fallback={<SuspenseFallback />}>
                  <GoalsView />
                </Suspense>
              </DashboardErrorBoundary>
            }
          />
          <Route
            path="settings"
            element={
              <DashboardErrorBoundary>
                <Suspense fallback={<SuspenseFallback />}>
                  <SettingsView />
                </Suspense>
              </DashboardErrorBoundary>
            }
          />
        </Route>
      </Routes>
    </HashRouter>
  );
}
