import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Switch,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';

type Language = 'tr' | 'en' | 'ar';

export default function SettingsScreen() {
  const navigation = useNavigation();
  const [language, setLanguage] = useState<Language>('tr');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [locationEnabled, setLocationEnabled] = useState(true);

  const languages: { code: Language; label: string }[] = [
    { code: 'tr', label: 'Türkçe' },
    { code: 'en', label: 'English' },
    { code: 'ar', label: 'العربية' },
  ];

  type SettingItem =
    | {
        icon: string;
        label: string;
        value: string;
        onPress: () => void;
      }
    | {
        icon: string;
        label: string;
        value: boolean;
        type: 'switch';
        onToggle: (value: boolean) => void;
      }
    | {
        icon: string;
        label: string;
        onPress: () => void;
        isDestructive?: boolean;
      };

  const settingsSections: { title: string; items: SettingItem[] }[] = [
    {
      title: 'Genel',
      items: [
        {
          icon: 'language-outline',
          label: 'Dil',
          value: languages.find(l => l.code === language)?.label || 'Türkçe',
          onPress: () => {
            const currentIndex = languages.findIndex(l => l.code === language);
            const nextIndex = (currentIndex + 1) % languages.length;
            setLanguage(languages[nextIndex].code);
          },
        },
        {
          icon: 'notifications-outline',
          label: 'Bildirimler',
          value: notificationsEnabled,
          type: 'switch',
          onToggle: setNotificationsEnabled,
        },
        {
          icon: 'location-outline',
          label: 'Konum Servisleri',
          value: locationEnabled,
          type: 'switch',
          onToggle: setLocationEnabled,
        },
      ],
    },
    {
      title: 'Hakkında',
      items: [
        {
          icon: 'information-circle-outline',
          label: 'Uygulama Hakkında',
          onPress: () => {

          },
        },
        {
          icon: 'document-text-outline',
          label: 'Gizlilik Politikası',
          onPress: () => {

          },
        },
        {
          icon: 'document-outline',
          label: 'Kullanım Koşulları',
          onPress: () => {

          },
        },
        {
          icon: 'help-circle-outline',
          label: 'Yardım & Destek',
          onPress: () => {

          },
        },
      ],
    },
    {
      title: 'Hesap',
      items: [
        {
          icon: 'person-outline',
          label: 'Profil',
          onPress: () => {

          },
        },
        {
          icon: 'log-out-outline',
          label: 'Çıkış Yap',
          onPress: () => {

          },
          isDestructive: true,
        },
      ],
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={colors.textOnSurface} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Ayarlar</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {settingsSections.map((section, sectionIndex) => (
          <View key={sectionIndex} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={styles.sectionContent}>
              {section.items.map((item, itemIndex) => {
                const isSwitch = 'type' in item && item.type === 'switch';
                const isDestructive = 'isDestructive' in item && item.isDestructive;
                const hasValue = 'value' in item;
                const hasOnPress = 'onPress' in item;

                return (
                  <TouchableOpacity
                    key={itemIndex}
                    style={[
                      styles.settingItem,
                      itemIndex === section.items.length - 1 && styles.settingItemLast,
                    ]}
                    onPress={hasOnPress ? item.onPress : undefined}
                    disabled={isSwitch}
                  >
                    <View style={styles.settingItemLeft}>
                      <Ionicons
                        name={item.icon as any}
                        size={24}
                        color={isDestructive ? colors.rosy : colors.accent}
                      />
                      <Text
                        style={[
                          styles.settingItemLabel,
                          isDestructive && styles.settingItemLabelDestructive,
                        ]}
                      >
                        {item.label}
                      </Text>
                    </View>
                    <View style={styles.settingItemRight}>
                      {isSwitch && 'value' in item && 'onToggle' in item ? (
                        <Switch
                          value={item.value}
                          onValueChange={item.onToggle}
                          trackColor={{
                            false: colors.surfaceAlt,
                            true: colors.accent,
                          }}
                          thumbColor={colors.surface}
                        />
                      ) : (
                        <>
                          {hasValue && typeof item.value === 'string' && (
                            <Text style={styles.settingItemValue}>
                              {item.value}
                            </Text>
                          )}
                          <Ionicons
                            name="chevron-forward"
                            size={20}
                            color={colors.textMuted}
                          />
                        </>
                      )}
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        ))}

        {/* App Version */}
        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>Versiyon 1.0.0</Text>
          <Text style={styles.versionSubtext}>Şanlıurfa Büyükşehir Belediyesi</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 16,
    backgroundColor: 'transparent',
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.cardShadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
  },
  headerRight: {
    width: 44,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 120,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 12,
    marginLeft: 4,
  },
  sectionContent: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: colors.cardShadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(10,51,35,0.08)',
  },
  settingItemLast: {
    borderBottomWidth: 0,
  },
  settingItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  settingItemLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.textOnSurface,
  },
  settingItemLabelDestructive: {
    color: colors.rosy,
  },
  settingItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  settingItemValue: {
    fontSize: 14,
    color: colors.textMuted,
    fontWeight: '500',
  },
  versionContainer: {
    alignItems: 'center',
    marginTop: 24,
    paddingVertical: 16,
  },
  versionText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textMuted,
    marginBottom: 4,
  },
  versionSubtext: {
    fontSize: 12,
    color: colors.textMuted,
    opacity: 0.7,
  },
});
