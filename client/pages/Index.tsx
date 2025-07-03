import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Heart, Calendar, Sparkles, Baby, Cake, Info } from "lucide-react";
import {
  calculateConceptionDate,
  getHolidaysAroundDate,
  getFamousPeopleByBirthday,
  getPopularCultureByYear,
} from "@/lib/date-utils";
import { ConceptionResults } from "@/components/ConceptionResults";
import { Link } from "react-router-dom";

interface ResultData {
  conceptionWeek: { start: Date; end: Date; center: Date };
  holidays: Array<{ name: string; date: string; type: string }>;
  celebrities: Array<{ name: string; profession: string; year: number }>;
  popularCulture: { songs: string[]; movies: string[] };
}

export default function Index() {
  const [birthDate, setBirthDate] = useState("");
  const [results, setResults] = useState<ResultData | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const handleCalculate = async () => {
    if (!birthDate) return;

    setIsCalculating(true);
    const birth = new Date(birthDate);

    try {
      const conceptionWeek = calculateConceptionDate(birth);
      const holidays = await getHolidaysAroundDate(conceptionWeek);
      const celebrities = getFamousPeopleByBirthday(birth);
      const popularCulture = getPopularCultureByYear(
        conceptionWeek.center.getFullYear(),
      );

      setResults({
        conceptionWeek,
        holidays,
        celebrities,
        popularCulture,
      });
    } catch (error) {
      console.error("Error calculating:", error);
    } finally {
      setIsCalculating(false);
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Baby className="h-10 w-10 text-primary animate-bounce" />
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
              Conception Calculator
            </h1>
            <Cake
              className="h-10 w-10 text-primary animate-bounce"
              style={{ animationDelay: "0.5s" }}
            />
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-4">
            Discover your estimated conception week, trending culture from that
            time, and famous people who share your birthday
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Heart className="h-4 w-4 text-red-500" />
              <span>Conception Week</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4 text-blue-500" />
              <span>Popular Culture</span>
            </div>
            <div className="flex items-center gap-1">
              <Sparkles className="h-4 w-4 text-purple-500" />
              <span>Celebrity Birthdays</span>
            </div>
          </div>
        </div>

        <div className="max-w-2xl mx-auto mb-8">
          <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-md hover:shadow-2xl transition-shadow duration-300">
            <CardHeader className="text-center pb-4">
              <CardTitle className="flex items-center justify-center gap-2 text-2xl">
                <Calendar className="h-6 w-6 text-blue-500" />
                Enter Your Birth Date
              </CardTitle>
              <CardDescription className="text-base">
                We'll calculate your conception week and show popular culture
                from that time, plus interesting facts about your birthday
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Input
                  type="date"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  className="text-center text-lg h-14 border-2 focus:border-primary transition-colors duration-200"
                  max={new Date().toISOString().split("T")[0]}
                  min="1900-01-01"
                />
                {birthDate && (
                  <p className="text-sm text-center text-muted-foreground">
                    You selected:{" "}
                    {new Date(birthDate).toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                )}
              </div>
              <Button
                onClick={handleCalculate}
                disabled={!birthDate || isCalculating}
                className="w-full h-14 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                size="lg"
              >
                {isCalculating ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                    Calculating your special dates...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5" />
                    Calculate My Conception Week
                    <Heart className="h-5 w-5 text-red-200" />
                  </div>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>

        {results && (
          <ConceptionResults results={results} birthDate={birthDate} />
        )}

        <footer className="mt-16 border-t bg-white/50 backdrop-blur-sm">
          <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center gap-2 text-lg font-semibold text-primary">
                <Heart className="h-5 w-5" />
                Conception Calculator
                <Heart className="h-5 w-5" />
              </div>
              <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
                Conception dates are estimates based on average pregnancy length
                (38 weeks). Individual pregnancies may vary. This tool is for
                entertainment and educational purposes only.
              </p>
              <div className="flex flex-wrap justify-center gap-4 pt-6">
                <Link to="/about">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-muted-foreground hover:text-primary"
                  >
                    <Info className="h-4 w-4 mr-1" />
                    About & FAQ
                  </Button>
                </Link>
              </div>
              <div className="flex flex-wrap justify-center gap-6 text-xs text-muted-foreground pt-4">
                <span>© 2025 Conception Calculator</span>
                <span>•</span>
                <span>Made with ❤️ for curious minds</span>
                <span>•</span>
                <span>Privacy Friendly - No Data Stored</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
