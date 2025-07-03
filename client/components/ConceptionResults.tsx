import {
  Heart,
  Calendar,
  Star,
  Gift,
  Sparkles,
  Share2,
  Download,
  Music,
  Film,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ResultData {
  conceptionWeek: { start: Date; end: Date; center: Date };
  holidays: Array<{ name: string; date: string; type: string }>;
  celebrities: Array<{ name: string; profession: string; year: number }>;
  popularCulture: { songs: string[]; movies: string[] };
}

interface ConceptionResultsProps {
  results: ResultData;
  birthDate: string;
}

export function ConceptionResults({
  results,
  birthDate,
}: ConceptionResultsProps) {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleShare = () => {
    const text = `I was likely conceived between ${formatDate(results.conceptionWeek.start)} and ${formatDate(results.conceptionWeek.end)}! 🎉 Check out your conception week at ${window.location.href}`;
    if (navigator.share) {
      navigator.share({
        title: "My Conception Week",
        text,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(text);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in-50 duration-500">
      {/* Conception Date Card */}
      <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 pointer-events-none" />
        <CardHeader className="text-center relative">
          <CardTitle className="flex items-center justify-center gap-2 text-2xl">
            <Heart className="h-6 w-6 text-red-500 animate-pulse" />
            Your Estimated Conception Week
            <Sparkles className="h-6 w-6 text-purple-500 animate-pulse" />
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center relative">
          <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-6 mb-4 transform hover:scale-105 transition-transform duration-200">
            <p className="text-2xl md:text-3xl font-bold text-purple-700 mb-2">
              {formatDate(results.conceptionWeek.start)}
            </p>
            <p className="text-lg text-purple-600 mb-2">to</p>
            <p className="text-2xl md:text-3xl font-bold text-purple-700 mb-3">
              {formatDate(results.conceptionWeek.end)}
            </p>
            <p className="text-muted-foreground">
              Based on an average 38-week pregnancy (±3 days for accuracy)
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 justify-center">
            <Button
              onClick={handleShare}
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <Share2 className="h-4 w-4" />
              Share Results
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              Save as Image
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            This is an estimate. Actual conception could vary by several weeks
            depending on individual factors.
          </p>
        </CardContent>
      </Card>

      {/* Popular Culture Card */}
      {(results.popularCulture.songs.length > 0 ||
        results.popularCulture.movies.length > 0) && (
        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Music className="h-5 w-5 text-green-500" />
              Popular Culture During Your Conception
            </CardTitle>
            <CardDescription>
              What was trending when you were likely conceived in{" "}
              {results.conceptionWeek.center.getFullYear()}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2">
              {results.popularCulture.songs.length > 0 && (
                <div>
                  <h4 className="flex items-center gap-2 font-semibold text-green-700 mb-3">
                    <Music className="h-4 w-4" />
                    Popular Songs
                  </h4>
                  <div className="space-y-2">
                    {results.popularCulture.songs
                      .slice(0, 3)
                      .map((song, index) => (
                        <div
                          key={index}
                          className="p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-100"
                        >
                          <p className="text-sm font-medium text-green-800">
                            {song}
                          </p>
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {results.popularCulture.movies.length > 0 && (
                <div>
                  <h4 className="flex items-center gap-2 font-semibold text-blue-700 mb-3">
                    <Film className="h-4 w-4" />
                    Popular Movies
                  </h4>
                  <div className="space-y-2">
                    {results.popularCulture.movies
                      .slice(0, 3)
                      .map((movie, index) => (
                        <div
                          key={index}
                          className="p-3 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border border-blue-100"
                        >
                          <p className="text-sm font-medium text-blue-800">
                            {movie}
                          </p>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Holidays Card */}
      {results.holidays.length > 0 && (
        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Gift className="h-5 w-5 text-orange-500" />
              Holidays During Your Conception Week
            </CardTitle>
            <CardDescription>
              Special occasions happening around when you were conceived
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              {results.holidays.map((holiday, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg hover:shadow-md transition-shadow duration-200 transform hover:scale-102"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-orange-200 rounded-full flex items-center justify-center">
                      <Gift className="h-5 w-5 text-orange-700" />
                    </div>
                    <div>
                      <p className="font-semibold text-orange-900">
                        {holiday.name}
                      </p>
                      <p className="text-sm text-orange-700">{holiday.date}</p>
                    </div>
                  </div>
                  <Badge
                    variant="secondary"
                    className="bg-orange-100 text-orange-800 border-orange-200"
                  >
                    {holiday.type}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Celebrities Card */}
      {results.celebrities.length > 0 && (
        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500" />
              Famous People Born on Your Day
            </CardTitle>
            <CardDescription>
              Celebrities and historical figures who share your birthday
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-2">
              {results.celebrities.map((celebrity, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-4 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-lg hover:shadow-md transition-all duration-200 transform hover:scale-102"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="h-12 w-12 bg-yellow-200 rounded-full flex items-center justify-center flex-shrink-0">
                    <Star className="h-6 w-6 text-yellow-700" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-yellow-900 truncate">
                      {celebrity.name}
                    </p>
                    <p className="text-sm text-yellow-700">
                      {celebrity.profession}
                    </p>
                    <p className="text-xs text-yellow-600">
                      Born {celebrity.year}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            {results.celebrities.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <Star className="h-12 w-12 mx-auto mb-3 text-muted-foreground/50" />
                <p>No famous people found for this exact date.</p>
                <p className="text-sm">Try a different birth date!</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Fun Facts Card */}
      <Card className="shadow-lg border-0 bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardContent className="text-center py-8">
          <div className="space-y-4">
            <Calendar className="h-12 w-12 mx-auto text-blue-500" />
            <h3 className="text-lg font-semibold text-blue-900">
              Interesting Birthday Facts
            </h3>
            <div className="grid gap-2 text-sm text-blue-700 max-w-md mx-auto">
              <p>• Your birthday occurs once every 365.25 days</p>
              <p>
                • You share your birthday with about 21 million people worldwide
              </p>
              <p>• The most common birthday is September 9th</p>
              <p>• February 29th is the rarest birthday</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
