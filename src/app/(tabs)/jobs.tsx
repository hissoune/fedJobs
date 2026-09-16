import { getJobsAction, loadMoreJobsAction } from '@/redux/slices/jobsSlice';
import { AppDispatch, RootState } from '@/redux/store';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlashList } from '@shopify/flash-list';

import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  RefreshControl
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { JobPriority } from '@/types';
import FilterPriority from '@/components/filtePriority';


type JobStatus = 'PENDING' | 'PROCESING' | 'COMPLEETED' | 'FAILED';

type Job = {
  id: string;
  title: string;
  description: string;
  status: JobStatus;
  priority: JobPriority;
  notes: string[];
  photos: string[];
  customerId: string;
  technicianId: string | null;
};

function JobCard({ job }: { job: Job }) {
  const router = useRouter()
  return (
    <Pressable
      onPress={() =>
        router.push({
          pathname: '/details/jobDetails',
          params: {
            id: job.id,
          },
        })
      }
      style={styles.jobCard}
    >
      <View style={styles.jobTop}>
        <View style={styles.priorityBadge}>
          <View
            style={[
              styles.priorityDot,
              job.priority === 'URGENT' && styles.urgentDot,
              job.priority === 'HIGH' && styles.highDot,
              job.priority === 'MEDIUM' && styles.mediumDot,
              job.priority === 'LOW' && styles.lowDot,
            ]}
          />

          <Text style={styles.priorityText}>
            {job.priority}
          </Text>
        </View>

        <View style={styles.statusBadge}>
          <View style={styles.statusDot} />
          <Text style={styles.statusText}>
            {job.status}
          </Text>
        </View>
      </View>

      <View style={styles.jobContent}>
        <Text style={styles.jobTitle} numberOfLines={1}>
          {job.title}
        </Text>

        <Text style={styles.jobDescription} numberOfLines={2}>
          {job.description}
        </Text>
      </View>

      <View style={styles.jobBottom}>
        <Text style={styles.jobLabel}>
          Available for application
        </Text>

        <View style={styles.viewJob}>
          <Text style={styles.viewJobText}>
            View
          </Text>

          <Text style={styles.arrow}>
            →
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

export default function Jobs() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter()
  const [page,setPage]= useState<number>(1)
  const {jobs,loading,loadingMore,hasMore,total} = useSelector((satte:RootState)=>satte.jobs)
  const [refreshing ,setRefreshing] = useState<boolean>(false)
  const [filters,setFilters] = useState<{priority:JobPriority}| null >(null)

  useEffect(()=>{    
  dispatch(getJobsAction({page:1,filters}))
  },[filters])

async function loadMoreJobs() {
  if (!hasMore || loadingMore || loading) {
    return;
  }
  const nextPage = page + 1;

  try {
    await dispatch(loadMoreJobsAction({page:nextPage,filters})).unwrap();
    
    setPage(nextPage);
  } catch (error) {
    console.log(error);
  }
}

const filter = (priority: string | null)=>{
  
  if (!priority) {
    setFilters(null)
    return
  }
  setFilters({ priority: priority as JobPriority })
}

const loadingmoreTimeOut = async ()=>{
    const startedAt = Date.now();
  const elapsed = Date.now() - startedAt;
    const minimumLoadingTime = 800;

    if (elapsed < minimumLoadingTime) {
      await new Promise(resolve =>
        setTimeout(resolve, minimumLoadingTime - elapsed)
      );
    }

  return (
<ActivityIndicator
              color="blue"
              size="small"
              style={{ marginBottom: 5 }}
            />
  )
}

  async function refreshJobs() {
  setRefreshing(true);
  try {
    await dispatch(getJobsAction({page:1,filters})).unwrap();
  } finally {
      setPage(1)

    setRefreshing(false);
  }
}


  return (
     <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Good morning</Text>
        </View>

        <Pressable style={styles.avatar}>
          <Text style={styles.avatarText}>K</Text>
        </Pressable>
      </View>

      <View style={styles.stats}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{total}</Text>
          <Text style={styles.statLabel}>Available jobs</Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statNumber}>3</Text>
          <Text style={styles.statLabel}>My active jobs</Text>
        </View>
      </View>

    
      <FilterPriority  filter={filter} />

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Available jobs</Text>

        <Pressable>
          <Text style={styles.seeAll}>See all</Text>
        </Pressable>
      </View>

      <FlashList
        data={jobs}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl
            tintColor={'blue'}
            refreshing={refreshing}
            onRefresh={refreshJobs}
          />
        }
        showsVerticalScrollIndicator={false}
        scrollToOverflowEnabled={true}
        drawDistance={800}
        renderItem={({ item }) => <JobCard job={item} />}
        onEndReachedThreshold={0.1}
        onEndReached={loadMoreJobs}
        ListFooterComponent={
          loadingMore ? (
               <SafeAreaView style={[styles.container, styles.horizontal]}>
                  <ActivityIndicator />
                  <ActivityIndicator size="large" />
                  <ActivityIndicator size="small" color="#0000ff" />
                  <ActivityIndicator size="large" color="#00ff00" />
                </SafeAreaView>
          )  : null
        }
      />
        </SafeAreaView>
      );
    }

const styles = StyleSheet.create({
  container: {
    padding:20,
    marginBottom:30,
    flex: 1,
    backgroundColor: '#f7f7f8',
  },
    horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },

  content: {
    padding: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 28,
  },

  greeting: {
    fontSize: 14,
    color: '#777',
    marginBottom: 4,
  },

  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#111',
  },

  avatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#111',
    alignItems: 'center',
    justifyContent: 'center',
  },

  avatarText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },

  stats: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 26,
  },

  statCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 18,
  },

  statNumber: {
    fontSize: 25,
    fontWeight: '800',
    color: '#111',
    marginBottom: 4,
  },

  statLabel: {
    fontSize: 13,
    color: '#777',
  },

  filters: {
    gap: 8,
    paddingBottom: 26,
  },

  filter: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#fff',
  },

  activeFilter: {
    backgroundColor: '#111',
  },

  filterText: {
    color: '#555',
    fontSize: 13,
    fontWeight: '600',
  },

  activeFilterText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#111',
  },

  seeAll: {
    fontSize: 13,
    fontWeight: '600',
    color: '#666',
  },

  jobCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 18,
    marginBottom: 12,
  },

  jobTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },

  priorityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },

  priorityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },

  urgentDot: {
    backgroundColor: '#e5484d',
  },

  highDot: {
    backgroundColor: '#f59e0b',
  },

  mediumDot: {
    backgroundColor: '#3b82f6',
  },

  lowDot: {
    backgroundColor: '#888',
  },

  priorityText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#777',
    letterSpacing: 0.5,
  },

  arrow: {
    fontSize: 20,
    color: '#999',
  },

  jobTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111',
    marginBottom: 7,
  },

  jobDescription: {
    fontSize: 14,
    lineHeight: 21,
    color: '#777',
    marginBottom: 18,
  },

  jobBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  status: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  statusDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#22c55e',
  },

  statusText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '600',
  },

  viewText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#111',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },

  loader: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },

  loaderText: {
    fontSize: 32,
    fontWeight: 'bold',
  },

  loadingText: {
    fontSize: 16,
    fontWeight: '600',
  },
  footer: { paddingVertical: 20, alignItems: 'center' },
  priorityBadge: {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '#f5f5f5',
  paddingHorizontal: 10,
  paddingVertical: 6,
  borderRadius: 20,
},

statusBadge: {
  flexDirection: 'row',
  alignItems: 'center',
},

jobContent: {
  marginBottom: 20,
},

jobLabel: {
  fontSize: 11,
  color: '#999',
  fontWeight: '500',
},

viewJob: {
  flexDirection: 'row',
  alignItems: 'center',
  gap: 5,
},

viewJobText: {
  fontSize: 13,
  fontWeight: '700',
  color: '#111',
},

});