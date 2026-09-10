import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";



export default function Index() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Good morning</Text>
          <Text style={styles.title}>Find your next job.</Text>
        </View>

        <Pressable style={styles.avatar}>
          <Text style={styles.avatarText}>K</Text>
        </Pressable>
      </View>
      </ScrollView>

      )


      }


      const styles = StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: '#f7f7f8',
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
          marginBottom: 24,
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


    })

