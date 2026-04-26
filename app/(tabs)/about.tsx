import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Colors, Radius, Spacing } from "@/constants/theme";
import { useThemeColors } from "@/hooks/use-theme-color";
import { Image } from "expo-image";
import { ScrollView, StyleSheet, View } from "react-native";

export default function AboutScreen() {
  const colors = useThemeColors();

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Avatar */}
        <View style={styles.avatarSection}>
          <Image
            source={require("@/assets/images/avatar.jpg")}
            style={styles.avatar}
            contentFit="cover"
          />
          <ThemedText type="subtitle" style={styles.profileName}>
            Radinka Alifasya Dinova
          </ThemedText>
          <ThemedText
            style={[styles.profileNim, { color: colors.textSecondary }]}
          >
            NIM: 2410501073
          </ThemedText>
        </View>

        {/* Profil Card */}
        <View
          style={[
            styles.card,
            { backgroundColor: colors.card, borderColor: colors.cardBorder },
          ]}
        >
          <ThemedText style={[styles.cardTitle, { color: colors.tint }]}>
            Profil Mahasiswa
          </ThemedText>
          <InfoRow
            label="Kelas"
            value="D3 Sistem Informasi - A"
            colors={colors}
          />
          <InfoRow label="Semester" value="4" colors={colors} />
          <InfoRow
            label="Mata Kuliah"
            value="Pemrograman Mobile Lanjut"
            colors={colors}
          />
        </View>

        {/* Project Card */}
        <View
          style={[
            styles.card,
            { backgroundColor: colors.card, borderColor: colors.cardBorder },
          ]}
        >
          <ThemedText style={[styles.cardTitle, { color: colors.tint }]}>
            Tentang Proyek
          </ThemedText>
          <InfoRow label="Tema" value="A — ResepKita" colors={colors} />
          <InfoRow
            label="Framework"
            value="React Native + Expo"
            colors={colors}
          />
          <InfoRow label="State Mgmt" value="Zustand" colors={colors} />
          <InfoRow label="Language" value="TypeScript" colors={colors} />
        </View>

        {/* Credit Card */}
        <View
          style={[
            styles.card,
            { backgroundColor: colors.card, borderColor: colors.cardBorder },
          ]}
        >
          <ThemedText style={[styles.cardTitle, { color: colors.tint }]}>
            Sumber Data
          </ThemedText>
          <InfoRow label="API" value="TheMealDB" colors={colors} />
          <InfoRow label="URL" value="themealdb.com" colors={colors} />
          <ThemedText style={[styles.creditNote, { color: colors.textMuted }]}>
            Data resep makanan disediakan oleh TheMealDB, database resep makanan
            gratis dan open-source.
          </ThemedText>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

function InfoRow({
  label,
  value,
  colors,
}: {
  label: string;
  value: string;
  colors: typeof Colors.light;
}) {
  return (
    <View style={[styles.infoRow, { borderBottomColor: colors.separator }]}>
      <ThemedText style={[styles.label, { color: colors.textSecondary }]}>
        {label}
      </ThemedText>
      <ThemedText style={styles.value}>{value}</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: Spacing.lg, paddingBottom: Spacing["3xl"] },
  avatarSection: { alignItems: "center", marginVertical: Spacing["2xl"] },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    marginBottom: Spacing.md,
  },
  profileName: { fontSize: 20, marginBottom: Spacing.xs },
  profileNim: { fontSize: 14 },
  card: {
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
    borderWidth: 1,
  },
  cardTitle: { fontSize: 15, fontWeight: "700", marginBottom: Spacing.md },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: Spacing.md,
    borderBottomWidth: 0.5,
  },
  label: { fontSize: 14, fontWeight: "500" },
  value: {
    fontSize: 14,
    fontWeight: "600",
    flex: 1,
    textAlign: "right",
    marginLeft: Spacing.md,
  },
  creditNote: { fontSize: 12, marginTop: Spacing.md, lineHeight: 18 },
  footer: { textAlign: "center", fontSize: 12, marginTop: Spacing.sm },
});
