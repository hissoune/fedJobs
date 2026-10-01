import { ApplicationStatus } from "@/types"
import { useState } from "react"
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native"

interface FilterPriorityProps {
  filter: (priority: string | null) => void
}
interface FilterApplicationStatusProps {
  filter: (status: ApplicationStatus | null) => void
}

export default function FilterPriority({ filter }: FilterPriorityProps) {
  const [activeFilter,setActiveFilter] = useState<string>('ALL')
  return (
   <View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filters}
      >
        <Pressable onPress={() => { setActiveFilter('ALL'); filter(null) }} style={[styles.filter, activeFilter === 'ALL' ? styles.activeFilter : null]}>
          <Text style={activeFilter === 'ALL' ? styles.activeFilterText : styles.filterText}>All</Text>
        </Pressable>

        <Pressable onPress={() => { setActiveFilter('URGENT');filter("URGENT") }} style={[styles.filter, activeFilter === 'URGENT' ? styles.activeFilter : null]}>
          <Text style={activeFilter === 'URGENT' ? styles.activeFilterText : styles.filterText}>Urgent</Text>
        </Pressable>

        <Pressable onPress={() => { setActiveFilter('HIGH'); filter("HIGH") }} style={[styles.filter, activeFilter === 'HIGH' ? styles.activeFilter : null]}>
          <Text style={activeFilter === 'HIGH' ? styles.activeFilterText : styles.filterText}>High</Text>
        </Pressable>

        <Pressable onPress={() => { setActiveFilter('MEDIUM'); filter("MEDIUM") }} style={[styles.filter, activeFilter === 'MEDIUM' ? styles.activeFilter : null]}>
          <Text style={activeFilter === 'MEDIUM' ? styles.activeFilterText : styles.filterText}>Medium</Text>
        </Pressable>

        <Pressable onPress={() => { setActiveFilter('LOW'); filter("LOW") }} style={[styles.filter, activeFilter === 'LOW' ? styles.activeFilter : null]}>
          <Text style={activeFilter === 'LOW' ? styles.activeFilterText : styles.filterText}>Low</Text>
        </Pressable>
      </ScrollView>
    </View>
  )
}

export const  FilterApplicationStatus = ({ filter }: FilterApplicationStatusProps) => {
  const [activeFilter,setActiveFilter] = useState<ApplicationStatus | 'ALL'>('ALL')
  return (
   <View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filters}
      >
        <Pressable onPress={() => { setActiveFilter('ALL'); filter(null) }} style={[styles.filter, activeFilter === 'ALL' ? styles.activeFilter : null]}>
          <Text style={activeFilter === 'ALL' ? styles.activeFilterText : styles.filterText}>All</Text>
        </Pressable>

        <Pressable onPress={() => { setActiveFilter('PENDING');filter("PENDING") }} style={[styles.filter, activeFilter === 'PENDING' ? styles.activeFilter : null]}>
          <Text style={activeFilter === 'PENDING' ? styles.activeFilterText : styles.filterText}>Pending</Text>
        </Pressable>

        <Pressable onPress={() => { setActiveFilter('APPROVED'); filter("APPROVED") }} style={[styles.filter, activeFilter === 'APPROVED' ? styles.activeFilter : null]}>
          <Text style={activeFilter === 'APPROVED' ? styles.activeFilterText : styles.filterText}>Approved</Text>
        </Pressable>

        <Pressable onPress={() => { setActiveFilter('DECLINED'); filter("DECLINED") }} style={[styles.filter, activeFilter === 'DECLINED' ? styles.activeFilter : null]}>
          <Text style={activeFilter === 'DECLINED' ? styles.activeFilterText : styles.filterText}>Declined</Text>
        </Pressable>
      </ScrollView>
    </View>
  )
}


const styles = StyleSheet.create({
  filters: {
    gap: 8,
    paddingHorizontal: 16,
  },
  filter: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#eee",
  },
  activeFilter: {
    backgroundColor: "#222",
  },
  filterText: {
    color: "#222",
  },
  activeFilterText: {
    color: "#fff",
  },
})
