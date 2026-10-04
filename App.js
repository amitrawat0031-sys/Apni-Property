import React, { useEffect, useMemo, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { supabase } from "./supabase";

const demoProperties = [
  {
    id: "1",
    typeHi: "प्लॉट",
    typeEn: "Plot",
    location: "Tamkuhiraj, Kushinagar",
    price: "₹12 लाख",
    area: "1200 sq.ft",
    listedByHi: "प्रॉपर्टी ओनर",
    listedByEn: "Property Owner"
  },
  {
    id: "2",
    typeHi: "मकान",
    typeEn: "House",
    location: "Gorakhpur",
    price: "₹42 लाख",
    area: "1500 sq.ft",
    listedByHi: "प्रॉपर्टी डीलर",
    listedByEn: "Property Dealer"
  },
  {
    id: "3",
    typeHi: "कृषि भूमि",
    typeEn: "Agricultural Land",
    location: "Padrauna, Kushinagar",
    price: "₹28 लाख",
    area: "1.5 एकड़",
    listedByHi: "प्रॉपर्टी ओनर",
    listedByEn: "Property Owner"
  }
];

export default function App() {
  const [lang, setLang] = useState("hi");
  const [screen, setScreen] = useState("home");
  const [properties, setProperties] = useState(demoProperties);

  useEffect(() => {
    const loadProperties = async () => {
      const { data, error } = await supabase.from("properties").select("*").order("created_at", { ascending: false });
      if (error) {
        console.log("SUPABASE PROPERTIES ERROR:", error.message);
        return;
      }
      if (data) setProperties(data);
    };
    loadProperties();
  }, []);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({
    type: "",
    transaction: "Sale",
    district: "",
    tehsil: "",
    village: "",
    area: "",
    gata: "",
    khata: "",
    khatauni: "",
    price: "",
    description: "",
    phone: ""
  });

  const t = useMemo(() => ({
    hi: {
      home: "होम",
      search: "खोजें",
      post: "प्रॉपर्टी जोड़ें",
      profile: "प्रोफाइल",
      title: "अपनी प्रॉपर्टी",
      tagline: "अपनी प्रॉपर्टी, अपने शहर में",
      searchPlaceholder: "प्रॉपर्टी, गांव, तहसील या लोकेशन खोजें",
      buy: "प्रॉपर्टी खरीदें",
      sell: "प्रॉपर्टी बेचें",
      rent: "किराए पर लें",
      dealer: "प्रॉपर्टी डीलर",
      requirement: "मुझे प्रॉपर्टी चाहिए",
      latest: "नई प्रॉपर्टी",
      list: "अपनी प्रॉपर्टी लिस्ट करें",
      owner: "प्रॉपर्टी ओनर",
      dealerText: "प्रॉपर्टी डीलर",
      details: "प्रॉपर्टी डिटेल",
      contact: "संपर्क करें",
      save: "सेव करें",
      formTitle: "प्रॉपर्टी लिस्ट करें",
      propertyType: "प्रॉपर्टी का प्रकार",
      district: "जिला",
      tehsil: "तहसील",
      village: "गांव / शहर",
      area: "क्षेत्रफल",
      gata: "गाटा नंबर",
      khata: "खाता नंबर",
      khatauni: "खतौनी संदर्भ",
      price: "कीमत",
      description: "विवरण",
      phone: "मोबाइल नंबर",
      submit: "लिस्टिंग भेजें",
      submitted: "आपकी लिस्टिंग समीक्षा के लिए भेज दी गई है।",
      empty: "कोई प्रॉपर्टी नहीं मिली।"
    },
    en: {
      home: "Home",
      search: "Search",
      post: "Post Property",
      profile: "Profile",
      title: "Apni Property",
      tagline: "Apni Property, Apne Shehar Mein",
      searchPlaceholder: "Search property, village, tehsil or location",
      buy: "Buy Property",
      sell: "Sell Property",
      rent: "Rent",
      dealer: "Property Dealers",
      requirement: "I Need a Property",
      latest: "Latest Properties",
      list: "List Your Property",
      owner: "Property Owner",
      dealerText: "Property Dealer",
      details: "Property Details",
      contact: "Contact",
      save: "Save",
      formTitle: "List Your Property",
      propertyType: "Property Type",
      district: "District",
      tehsil: "Tehsil",
      village: "Village / Town",
      area: "Area",
      gata: "Gata Number",
      khata: "Khata Number",
      khatauni: "Khatauni Reference",
      price: "Price",
      description: "Description",
      phone: "Mobile Number",
      submit: "Submit Listing",
      submitted: "Your listing has been sent for review.",
      empty: "No properties found."
    }
  }[lang]), [lang]);

  const filtered = demoProperties.filter(p =>
    (p.location + " " + p.typeEn + " " + p.typeHi).toLowerCase()
      .includes(search.toLowerCase())
  );

  const Field = ({label, value, onChange, placeholder}) => (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder={placeholder || label}
        style={styles.input}
      />
    </View>
  );

  const PropertyCard = ({p}) => (
    <View style={styles.card}>
      <View style={styles.photo}>
        <Text style={styles.photoText}>🏠</Text>
      </View>
      <View style={{flex:1}}>
        <Text style={styles.cardTitle}>{lang === "hi" ? p.typeHi : p.typeEn}</Text>
        <Text style={styles.muted}>{p.location}</Text>
        <Text style={styles.price}>{p.price}</Text>
        <Text style={styles.muted}>{p.area}</Text>
        <Text style={styles.badge}>{lang === "hi" ? p.listedByHi : p.listedByEn}</Text>
        <View style={styles.row}>
          <TouchableOpacity style={styles.smallBtn} onPress={() => Alert.alert(t.details, p.location)}>
            <Text>{t.details}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.smallBtn} onPress={() => Alert.alert(t.contact, "Contact feature will be connected later.")}>
            <Text>{t.contact}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const Home = () => (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{t.title}</Text>
      <Text style={styles.tagline}>{t.tagline}</Text>

      <TextInput
        value={search}
        onChangeText={setSearch}
        placeholder={t.searchPlaceholder}
        style={styles.search}
      />

      <View style={styles.grid}>
        {[
          [t.buy, "🔎", "search"],
          [t.sell, "🏷️", "post"],
          [t.rent, "🏠", "search"],
          [t.dealer, "🤝", "profile"]
        ].map(([label, icon, target]) => (
          <TouchableOpacity key={label} style={styles.action} onPress={() => setScreen(target)}>
            <Text style={styles.icon}>{icon}</Text>
            <Text style={styles.actionText}>{label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.primary} onPress={() => setScreen("post")}>
        <Text style={styles.primaryText}>{t.list}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.secondary} onPress={() => Alert.alert(t.requirement, "Buyer requirement form can be added next.")}>
        <Text style={styles.secondaryText}>{t.requirement}</Text>
      </TouchableOpacity>

      <Text style={styles.section}>{t.latest}</Text>
      {filtered.length ? filtered.map(p => <PropertyCard key={p.id} p={p} />) :
        <Text style={styles.muted}>{t.empty}</Text>}
    </ScrollView>
  );

  const SearchScreen = () => (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>{t.search}</Text>
      <TextInput value={search} onChangeText={setSearch} placeholder={t.searchPlaceholder} style={styles.search}/>
      {filtered.map(p => <PropertyCard key={p.id} p={p}/>)}
      {!filtered.length && <Text style={styles.muted}>{t.empty}</Text>}
    </ScrollView>
  );

  const PostScreen = () => (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>{t.formTitle}</Text>
      <Text style={styles.helper}>
        {lang === "hi"
          ? "ओनर सीधे अपनी प्रॉपर्टी लिस्ट कर सकता है।"
          : "Owners can list their property directly."}
      </Text>

      <Field label={t.propertyType} value={form.type} onChange={v => setForm({...form,type:v})} placeholder="Plot / House / Shop"/>
      <Field label={t.district} value={form.district} onChange={v => setForm({...form,district:v})} placeholder="Kushinagar / Gorakhpur"/>
      <Field label={t.tehsil} value={form.tehsil} onChange={v => setForm({...form,tehsil:v})} placeholder="Tamkuhiraj"/>
      <Field label={t.village} value={form.village} onChange={v => setForm({...form,village:v})}/>
      <Field label={t.area} value={form.area} onChange={v => setForm({...form,area:v})}/>
      <Field label={t.gata} value={form.gata} onChange={v => setForm({...form,gata:v})}/>
      <Field label={t.khata} value={form.khata} onChange={v => setForm({...form,khata:v})}/>
      <Field label={t.khatauni} value={form.khatauni} onChange={v => setForm({...form,khatauni:v})}/>
      <Field label={t.price} value={form.price} onChange={v => setForm({...form,price:v})}/>
      <Field label={t.description} value={form.description} onChange={v => setForm({...form,description:v})}/>
      <Field label={t.phone} value={form.phone} onChange={v => setForm({...form,phone:v})}/>

      <TouchableOpacity
  style={styles.primary}
  onPress={async () => {
    const { error } = await supabase.from("properties").insert([{
      title: form.type || "Property Listing",
      property_type: form.type,
      listing_type: form.transaction,
      district: form.district,
      tehsil: form.tehsil,
      village: form.village,
      area: Number(form.area) || null,
      gata: form.gata,
      khata: form.khata,
      khatauni: form.khatauni,
      price: Number(form.price) || null,
      description: form.description,
      owner_phone: form.phone
    }]);

    if (error) {
      Alert.alert("Error", error.message);
      return;
    }

    Alert.alert("Success", "Property successfully listed.");
    setForm({
      type: "",
      transaction: "Sale",
      district: "",
      tehsil: "",
      village: "",
      area: "",
      gata: "",
      khata: "",
      khatauni: "",
      price: "",
      description: "",
      phone: ""
    });
  }}
>
        <Text style={styles.primaryText}>{t.submit}</Text>
      </TouchableOpacity>
    </ScrollView>
  );

  const Profile = () => (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>{t.profile}</Text>
      <Text style={styles.section}>Language / भाषा</Text>
      <View style={styles.row}>
        <TouchableOpacity style={[styles.langBtn, lang === "hi" && styles.selected]} onPress={() => setLang("hi")}>
          <Text>हिंदी</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.langBtn, lang === "en" && styles.selected]} onPress={() => setLang("en")}>
          <Text>English</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.helper}>
        {lang === "hi"
          ? "V1 में data demo/local है। Firebase, Maps और अधिक सुविधाएं बाद में जोड़ी जा सकती हैं।"
          : "V1 uses demo/local data. Firebase, Maps and more features can be connected later."}
      </Text>
    </ScrollView>
  );

  let content = <Home />;
  if (screen === "search") content = <SearchScreen />;
  if (screen === "post") content = <PostScreen />;
  if (screen === "profile") content = <Profile />;

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" />
      {content}
      <View style={styles.nav}>
        {[
          ["home", "⌂", t.home],
          ["search", "⌕", t.search],
          ["post", "+", t.post],
          ["profile", "●", t.profile]
        ].map(([id, icon, label]) => (
          <TouchableOpacity key={id} style={styles.navItem} onPress={() => setScreen(id)}>
            <Text style={styles.navIcon}>{icon}</Text>
            <Text style={styles.navText}>{label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#f7f8fa" },
  container: { padding: 18, paddingBottom: 110 },
  title: { fontSize: 32, fontWeight: "800", marginTop: 8 },
  tagline: { fontSize: 16, marginTop: 4, marginBottom: 18, color: "#555" },
  heading: { fontSize: 26, fontWeight: "800", marginBottom: 14 },
  search: { backgroundColor: "#fff", borderWidth: 1, borderColor: "#ddd", borderRadius: 14, padding: 14, fontSize: 16, marginBottom: 16 },
  grid: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  action: { width: "48%", backgroundColor: "#fff", borderRadius: 16, padding: 16, borderWidth: 1, borderColor: "#e2e2e2" },
  icon: { fontSize: 26, marginBottom: 8 },
  actionText: { fontSize: 15, fontWeight: "700" },
  primary: { backgroundColor: "#111", borderRadius: 14, padding: 16, alignItems: "center", marginTop: 18 },
  primaryText: { color: "#fff", fontWeight: "800", fontSize: 16 },
  secondary: { backgroundColor: "#fff", borderRadius: 14, padding: 15, alignItems: "center", marginTop: 10, borderWidth: 1, borderColor: "#ddd" },
  secondaryText: { fontWeight: "700" },
  section: { fontSize: 21, fontWeight: "800", marginTop: 24, marginBottom: 12 },
  card: { backgroundColor: "#fff", borderRadius: 16, padding: 12, marginBottom: 12, flexDirection: "row", gap: 12, borderWidth: 1, borderColor: "#e5e5e5" },
  photo: { width: 92, height: 92, borderRadius: 12, backgroundColor: "#ececec", alignItems: "center", justifyContent: "center" },
  photoText: { fontSize: 35 },
  cardTitle: { fontSize: 17, fontWeight: "800" },
  muted: { color: "#666", marginTop: 3 },
  price: { fontSize: 18, fontWeight: "800", marginTop: 6 },
  badge: { alignSelf: "flex-start", marginTop: 6, backgroundColor: "#eee", paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8, fontSize: 12 },
  row: { flexDirection: "row", gap: 8, marginTop: 10, flexWrap: "wrap" },
  smallBtn: { borderWidth: 1, borderColor: "#ddd", paddingHorizontal: 10, paddingVertical: 8, borderRadius: 9 },
  field: { marginBottom: 12 },
  label: { fontWeight: "700", marginBottom: 6 },
  input: { backgroundColor: "#fff", borderWidth: 1, borderColor: "#ddd", borderRadius: 12, padding: 13 },
  helper: { color: "#666", lineHeight: 21, marginBottom: 12 },
  langBtn: { padding: 13, borderWidth: 1, borderColor: "#ddd", borderRadius: 10, backgroundColor: "#fff" },
  selected: { borderWidth: 2, borderColor: "#111" },
  nav: { position: "absolute", bottom: 0, left: 0, right: 0, backgroundColor: "#fff", borderTopWidth: 1, borderTopColor: "#ddd", flexDirection: "row", justifyContent: "space-around", paddingTop: 9, paddingBottom: 12 },
  navItem: { alignItems: "center", minWidth: 65 },
  navIcon: { fontSize: 20 },
  navText: { fontSize: 11, marginTop: 2 }
});
