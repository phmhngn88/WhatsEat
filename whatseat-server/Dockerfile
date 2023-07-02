FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 5095
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
ENV PATH $PATH:/root/.dotnet/tools
RUN dotnet tool install -g dotnet-ef
WORKDIR /src
COPY ["whatseat-server/whatseat-server.csproj", "./"]
RUN dotnet restore "whatseat-server.csproj"
COPY . .
WORKDIR "/src/"
# RUN dotnet-ef database update -s "whatseat-server/whatseat-server.csproj"
RUN dotnet build "whatseat-server/whatseat-server.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "whatseat-server/whatseat-server.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "whatseat-server.dll"]
