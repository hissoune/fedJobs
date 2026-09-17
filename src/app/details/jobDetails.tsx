import { getJobAction } from '@/redux/slices/jobsSlice';
import { AppDispatch, RootState } from '@/redux/store';
import { useLocalSearchParams } from 'expo-router';
import { useEffect } from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

export default function JobDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const dispatch = useDispatch<AppDispatch>();

  const { job, loading } = useSelector(
    (state: RootState) => state.jobs
  );

  useEffect(() => {
    if (id) {
      dispatch(getJobAction(id));
    }
  }, [id, dispatch]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    );
  }

  if (!job) {
    return (
      <View style={styles.center}>
        <Text style={styles.notFoundTitle}>Job not found</Text>
        <Text style={styles.notFoundText}>
          This job may no longer be available.
        </Text>
      </View>
    );
  }

  const priority = {
    URGENT: {
      color: '#dc2626',
      background: '#fef2f2',
    },
    HIGH: {
      color: '#ea580c',
      background: '#fff7ed',
    },
    MEDIUM: {
      color: '#ca8a04',
      background: '#fefce8',
    },
    LOW: {
      color: '#16a34a',
      background: '#f0fdf4',
    },
  }[job.priority];

  const status = {
    PENDING: {
      color: '#2563eb',
      background: '#eff6ff',
      label: 'Pending',
    },
    PROCESING: {
      color: '#9333ea',
      background: '#faf5ff',
      label: 'Processing',
    },
    COMPLEETED: {
      color: '#16a34a',
      background: '#f0fdf4',
      label: 'Completed',
    },
    FAILED: {
      color: '#dc2626',
      background: '#fef2f2',
      label: 'Failed',
    },
  }[job.status];

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <View style={styles.badges}>
          <View
            style={[
              styles.badge,
              { backgroundColor: priority.background },
            ]}
          >
            <View
              style={[
                styles.dot,
                { backgroundColor: priority.color },
              ]}
            />

            <Text
              style={[
                styles.badgeText,
                { color: priority.color },
              ]}
            >
              {job.priority}
            </Text>
          </View>

          <View
            style={[
              styles.badge,
              { backgroundColor: status.background },
            ]}
          >
            <View
              style={[
                styles.dot,
                { backgroundColor: status.color },
              ]}
            />

            <Text
              style={[
                styles.badgeText,
                { color: status.color },
              ]}
            >
              {status.label}
            </Text>
          </View>
        </View>

        <Text style={styles.title}>{job.title}</Text>

        <Text style={styles.description}>
          {job.description}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Job information</Text>

        <View style={styles.infoList}>
          <InfoRow
            label="Priority"
            value={job.priority}
          />

          <InfoRow
            label="Status"
            value={status.label}
          />
          <InfoRow
            label="price"
            value={`${job.price}$`}
          />

          <InfoRow
            label="Created"
            value={formatDate(job.createdAt)}
          />

          <InfoRow
            label="Last updated"
            value={formatDate(job.updatedAt)}
            last
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Customer</Text>

        <View style={styles.personRow}>
           <View
               style={{
                 width: 40,
                 height: 40,
                 borderRadius: 32,
                 overflow: 'hidden',
                 margin:10 
               }}
             >
               <Image
                 source={{ uri: job.customer?.imageUrl }}
                 style={{
                   width: '100%',
                   height: '100%',
                 }}
                 resizeMode="cover"
               />
             </View>

          <View style={styles.personInfo}>
            <Text style={styles.personName}>
              {job.customer?.name ?? 'Unknown customer'}
            </Text>

            <Text style={styles.personSubtext}>
              Customer
            </Text>
          </View>
        </View>
      </View>

      {job.notes?.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notes</Text>

          <View style={styles.notes}>
            {job.notes.map((note, index) => (
              <View key={index} style={styles.note}>
                <View style={styles.noteBullet} />

                <Text style={styles.noteText}>
                  {note}
                </Text>
              </View>
            ))}
          </View>
        </View>
      )}

      {job.photos?.length > 0 && (
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Photos</Text>

            <Text style={styles.count}>
              {job.photos.length}
            </Text>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.photos}
          >
            {job.photos.map((photo, index) => (
              <Image
                key={index}
                source={{ uri: photo }}
                style={styles.photo}
              />
            ))}
          </ScrollView>
        </View>
      )}

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionTitle}>
              Applications
            </Text>

            <Text style={styles.sectionDescription}>
              {job.applications?.length ?? 0} technicians have
              applied
            </Text>
          </View>

          {(job.applications?.length ?? 0) > 0 && (
            <TouchableOpacity>
              <Text style={styles.link}>View all</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>


      {job.status === 'PENDING' && (
        <TouchableOpacity
          style={styles.applyButton}
          activeOpacity={0.85}
        >
          <Text style={styles.applyText}>
            Apply for this job
          </Text>

          <Text style={styles.arrow}>→</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
}

function InfoRow({
  label,
  value,
  last = false,
}: {
  label: string;
  value: string;
  last?: boolean;
}) {
  return (
    <View
      style={[
        styles.infoRow,
        !last && styles.infoRowBorder,
      ]}
    >
      <Text style={styles.infoLabel}>{label}</Text>

      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },

  content: {
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 50,
  },

  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },

  notFoundTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0f172a',
  },

  notFoundText: {
    marginTop: 6,
    color: '#64748b',
    fontSize: 14,
  },

  /* HEADER */

  header: {
    paddingBottom: 28,
  },

  badges: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 18,
  },

  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },

  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    marginRight: 6,
  },

  badgeText: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.3,
  },

  title: {
    fontSize: 30,
    lineHeight: 36,
    fontWeight: '800',
    color: '#0f172a',
    letterSpacing: -0.7,
  },

  description: {
    marginTop: 12,
    fontSize: 16,
    lineHeight: 25,
    color: '#64748b',
  },

  /* SECTIONS */

  section: {
    paddingVertical: 22,
    borderTopWidth: 1,
    borderTopColor: '#eef2f7',
  },

  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 14,
  },

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  sectionDescription: {
    fontSize: 13,
    color: '#64748b',
    marginTop: -8,
  },

  link: {
    fontSize: 14,
    fontWeight: '700',
    color: '#2563eb',
  },

  count: {
    fontSize: 13,
    fontWeight: '700',
    color: '#64748b',
  },

  /* INFO */

  infoList: {
    borderRadius: 12,
  },

  infoRow: {
    minHeight: 48,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  infoRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#eef2f7',
  },

  infoLabel: {
    fontSize: 14,
    color: '#64748b',
  },

  infoValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#334155',
  },

  /* PEOPLE */

  personRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  avatarText: {
    fontSize: 17,
    fontWeight: '800',
    color: '#2563eb',
  },

  personInfo: {
    flex: 1,
  },

  personName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0f172a',
  },

  personSubtext: {
    fontSize: 13,
    color: '#64748b',
    marginTop: 3,
  },

  /* NOTES */

  notes: {
    gap: 13,
  },

  note: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },

  noteBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#2563eb',
    marginTop: 7,
    marginRight: 10,
  },

  noteText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 21,
    color: '#475569',
  },

  /* PHOTOS */

  photos: {
    paddingTop: 2,
  },

  photo: {
    width: 130,
    height: 100,
    borderRadius: 14,
    backgroundColor: '#e2e8f0',
    marginRight: 10,
  },

  /* TECHNICIAN */

  unassigned: {
    paddingVertical: 4,
  },

  unassignedTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#475569',
  },

  unassignedText: {
    marginTop: 5,
    fontSize: 13,
    lineHeight: 20,
    color: '#94a3b8',
  },

  /* ACTION */

  applyButton: {
    height: 56,
    borderRadius: 16,
    backgroundColor: '#111',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
    button: {
    height: 52,
    borderRadius: 10,
    backgroundColor: '#111',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    marginBottom: 24,
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },

  applyText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '800',
  },

  arrow: {
    color: '#ffffff',
    fontSize: 20,
    marginLeft: 10,
  },
});

